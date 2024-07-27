import * as Haptics from 'expo-haptics';
import React from 'react'
import { View, Text } from 'react-native'
import { TextInput, Pressable } from 'react-native'
import { useTheme } from '@/theme';

const ForgotPassword = ({ handleAuthPageStates }: { handleAuthPageStates: (page: number) => void }) => {
    const { colors } = useTheme();
    const [{ email }, setCredentials] = React.useState({ email: '' });
    const handleEmailCredentials = (key: string) => (value: string) => {
        console.log('Setting', key, 'to', value);
        setCredentials((prev) => ({ ...prev, [key]: value }));
    }

    const onForgotPasswordSubmit = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        console.log('Email:', email)
    }

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '90%', gap: 20 }}>
                <Text style={{ color: colors.primary.main, fontSize: 42, fontFamily: '400' }}>Forgot Password</Text>
                <Text style={{ color: colors.primary.main, fontSize: 20, fontFamily: '300' }}>Enter your email to reset your password</Text>
                <TextInput
                    style={{
                        padding: 8,
                        borderRadius: 8,
                        fontSize: 20,
                        backgroundColor: colors.background.nav,
                        color: colors.primary.main,
                        fontFamily: '300'
                    }}
                    placeholder="Email"
                    placeholderTextColor={colors.primary.main}
                    value={email}
                    onChangeText={handleEmailCredentials('email')}
                />
            </View>

            <View style={{ flexDirection: 'row', gap: 8, marginTop: 42 }}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? colors.background.paperOne : colors.background.nav,
                        }, { padding: 14, width: 100, alignItems: 'center', borderRadius: 8 }
                    ]}
                    onPress={() => onForgotPasswordSubmit()}>
                    <Text style={{ fontSize: 16, color: colors.primary.main, fontFamily: '500' }}>Submit</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? colors.background.paperOne : colors.background.nav,
                        }, { padding: 14, width: 100, alignItems: 'center', borderRadius: 8 }
                    ]}
                    onPress={() => handleAuthPageStates(0)}>
                    <Text style={{ fontSize: 16, color: colors.primary.main, fontFamily: '500' }}>Go Back</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ForgotPassword