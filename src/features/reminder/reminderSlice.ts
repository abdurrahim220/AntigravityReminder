import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Reminder, ReminderState } from "./reminderTypes";


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
        }
    }
})

export const {addReminder,deleteReminder,updateReminder} = reminderSlice.actions
export default reminderSlice.reducer