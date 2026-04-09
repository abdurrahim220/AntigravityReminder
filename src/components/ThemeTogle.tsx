
import { Text, View, useColorScheme } from 'react-native'

export default function ThemeTogle() {
    const isDarkMode = useColorScheme() === 'dark';

  return (
    <View>
        <Text>{isDarkMode ? 'Dark' : 'Light'}</Text>
    </View>
  )
}
