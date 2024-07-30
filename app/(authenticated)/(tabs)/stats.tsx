import * as Haptics from 'expo-haptics';
import React from 'react'
import { Text, Button, ScrollView, View } from 'react-native'
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
            <View style={{ gap: 8, paddingVertical: 8 }}>
                <Button title="Success" onPress={() => showNotification({
                    type: 'success',
                    text1: 'Hello Success',
                    text2: 'This is a success toast, I can consume any custom props',
                    props: { ...toastColors.success }
                })} />
                <Button title="Error" onPress={() => showNotification({
                    type: 'error',
                    text1: 'Hello Error',
                    text2: 'This is a success toast, I can consume any custom props test. This is a success toast, I can consume any custom props test.',
                    props: { ...toastColors.error }
                })} />
                <Button title="Info" onPress={() => showNotification({
                    type: 'info',
                    text1: 'Hello Info',
                    text2: 'This is a success toast, I can consume any custom props test.  This is a success toast, I can consume any custom props test.  This is a success toast, I can consume any custom props test',
                    props: { ...toastColors.info }
                })} />

                <Button title="Warn" onPress={() => showNotification({
                    type: 'warn',
                    text1: 'Hello Warn',
                    text2: 'This is a success toast, I can consume any custom props test.  This is a success toast, I can consume any custom props test.  This is a success toast, I can consume any custom props test.  This is a success toast, I can consume any custom props test',
                    props: { ...toastColors.warn }
                })} />
                <Button title="Custom Warn" onPress={() => showNotification({
                    type: 'customWarn',
                    text1: 'Hello customWarn',
                    text2: 'This is a customWarn toast',
                    props: {
                        ...toastColors.warn,
                        error_message: "Error processing Data",
                        test_possible: `Reduce the batch size to ${100} or less, or increase the slice index to ${245}`,
                        train_possible: `Decrease the train size to below 43% or increase the slice index to ${344}`,
                    }
                })} />
                <Button title="Custom Error" onPress={() => showNotification({
                    type: 'customError',
                    text1: 'Hello customError',
                    text2: 'This is a customError toast',
                    props: {
                        ...toastColors.error,
                        message: "Error processing Data",
                        step: `1`,
                        func_error: `Decrease the train size to below 43% or increase the slice index to ${344}`,
                    }
                })} />
            </View>

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