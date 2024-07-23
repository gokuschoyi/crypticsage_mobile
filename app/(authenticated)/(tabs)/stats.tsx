import { View, Text, Button } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme'
import ScreenBody from '@/components/global/ScreenBody'
import { ScrollView } from 'react-native'
import Toast from 'react-native-toast-message';


const Stats = () => {
    const { colors, setScheme, isDark } = useTheme();
    const changeTheme = () => {
        if (isDark) {
            setScheme('light');
        } else {
            setScheme('dark');
        }
    }

    return (
        <ScreenBody>
            <Text style={{ color: colors.primary.main }}>Stats, {`${isDark}`}</Text>
            <Button title="Toggle theme" onPress={() => changeTheme()} />
            <Button title="Toast" onPress={() => Toast.show({
                type: 'success',
                text1: 'Hello',
                text2: 'This is a success toast',

            })} />
            {/* <ScrollView >
                <Text>Animated View start</Text>
                <Text>Animated View end</Text>
            </ScrollView> */}
        </ScreenBody>
    )
}

export default Stats