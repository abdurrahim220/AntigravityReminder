import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Reminder, ReminderState } from "./reminderTypes";
import { AppDispatch, RootState } from "../../app/store";
import { saveReminders } from "../../storage/reminderStorage";


const initialState:ReminderState = {
    reminders:[],
    loading:false,
    error:null
}

const reminderSlice = createSlice({
    name:"reminder",
    initialState,
    reducers:{
        addReminder:(state,action:PayloadAction<Reminder>)=>{
            state.reminders.push(action.payload)
        },
        deleteReminder:(state,action:PayloadAction<string>)=>{
            state.reminders = state.reminders.filter((reminder)=>reminder.id !== action.payload)
        },
        updateReminder:(state,action:PayloadAction<Reminder>)=>{
            const updatedReminder = action.payload
            state.reminders = state.reminders.map((reminder)=>reminder.id === updatedReminder.id ? updatedReminder : reminder)
        },
        setReminders: (state, action: PayloadAction<Reminder[]>) => {
            state.reminders = action.payload;
        },
        checkAutoResets: (state) => {
            const now = Date.now();
            state.reminders = state.reminders.map(reminder => {
                if (reminder.isUsed && reminder.availableAt && now >= reminder.availableAt) {
                    return { ...reminder, isUsed: false, isAvailable: true, availableAt: null };
                }
                return reminder;
            });
        },
        toggleReminderStatus: (state, action: PayloadAction<string>) => {
            const reminderId = action.payload;
            state.reminders = state.reminders.map(reminder => {
                if (reminder.id === reminderId) {
                    if (!reminder.isUsed) {
                        // Mark as used
                        const availableAt = reminder.resetDuration > 0 
                            ? Date.now() + reminder.resetDuration 
                            : null;
                        return { ...reminder, isUsed: true, isAvailable: false, availableAt };
                    } else {
                        // Mark as available manually
                        return { ...reminder, isUsed: false, isAvailable: true, availableAt: null };
                    }
                }
                return reminder;
            });
        }
        
    }
})

// === THUNKS ===
export const addReminderAndPersist = (reminder: Reminder) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(reminderSlice.actions.addReminder(reminder));
    const { reminders } = getState().reminder;
    await saveReminders(reminders);
};

export const deleteReminderAndPersist = (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(reminderSlice.actions.deleteReminder(id));
    const { reminders } = getState().reminder;
    await saveReminders(reminders);
};

export const updateReminderAndPersist = (reminder: Reminder) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(reminderSlice.actions.updateReminder(reminder));
    const { reminders } = getState().reminder;
    await saveReminders(reminders);
};

export const toggleReminderAndPersist = (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(reminderSlice.actions.toggleReminderStatus(id));
    const { reminders } = getState().reminder;
    await saveReminders(reminders);
};

export const checkAutoResetsAndPersist = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const beforeStr = JSON.stringify(getState().reminder.reminders);
    dispatch(reminderSlice.actions.checkAutoResets());
    const { reminders } = getState().reminder;
    const afterStr = JSON.stringify(reminders);
    
    if (beforeStr !== afterStr) {
        await saveReminders(reminders);
    }
};

export const { addReminder, deleteReminder, updateReminder, setReminders, checkAutoResets, toggleReminderStatus } = reminderSlice.actions
export default reminderSlice.reducer