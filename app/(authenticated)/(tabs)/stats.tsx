import * as Haptics from 'expo-haptics';
import React from 'react'
import { Text, Button, ScrollView } from 'react-native'
import { useTheme } from '@/theme'
import ScreenBody from '@/components/global/ScreenBody'
import NotificationsHandler from '@/components/notifications/NotificationsHandler';

const Stats = () => {
    const { colors, setScheme, isDark, toastColors } = useTheme();
    const { showNotification } = NotificationsHandler()
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
            <Button title="Toast" onPress={() => showNotification({
                type: 'success',
                text1: 'Hello',
                text2: 'This is a success toast',
                props: { ...toastColors.success }
            })} />

            <Button
                title="Test Haptics"
                onPress={
                    () =>
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                }
            />
            {/* <ScrollView >
                <Text>Animated View start</Text>
                <Text>Animated View end</Text>
            </ScrollView> */}
        </ScreenBody>
    )
}

export default Stats