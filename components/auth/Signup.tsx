import * as Haptics from 'expo-haptics';
import React from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

enum SignUpType {
    Email,
    Google,
    Facebook,
}

const Signup = ({ handleAuthPageStates }: { handleAuthPageStates: (page: number) => void }) => {
    const { colors } = useTheme();
    const [{ username, s_email, mobile, s_password, r_password }, setSignUpCredentials] = React.useState({ username: '', s_email: '', mobile: '', s_password: '', r_password: '' });
    const handleSignUpCredentials = (key: string) => (value: string) => {
        console.log('Setting', key, 'to', value);
        setSignUpCredentials((prev) => ({ ...prev, [key]: value }));
    }

    const onSignUp = (type: SignUpType) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        console.log('Sign Up with', type);
    }

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '90%', gap: 20 }}>
                <Text style={{ color: colors.primary.main, fontSize: 42, fontFamily: '400' }}>Signup</Text>
                <TextInput
                    style={{
                        padding: 8,
                        borderRadius: 8,
                        fontSize: 20,
                        backgroundColor: colors.background.nav,
                        color: colors.primary.main,
                        fontFamily: '300'
                    }}
                    autoComplete="off"
                    placeholder="Username"
                    placeholderTextColor={colors.primary.main}
                    value={username}
                    onChangeText={handleSignUpCredentials('username')}
                />
                <TextInput
                    style={{
                        padding: 8,
                        borderRadius: 8,
                        fontSize: 20,
                        backgroundColor: colors.background.nav,
                        color: colors.primary.main,
                        fontFamily: '300'
                    }}
                    autoComplete="off"
                    placeholder="Email"
                    placeholderTextColor={colors.primary.main}
                    value={s_email}
                    onChangeText={handleSignUpCredentials('s_email')}
                />
                <TextInput
                    style={{
                        padding: 8,
                        borderRadius: 8,
                        fontSize: 20,
                        backgroundColor: colors.background.nav,
                        color: colors.primary.main,
                        fontFamily: '300'
                    }}
                    autoComplete="off"
                    placeholder="Mobile"
                    placeholderTextColor={colors.primary.main}
                    value={mobile}
                    keyboardType="numeric"
                    onChangeText={handleSignUpCredentials('mobile')}
                />
                <TextInput
                    style={{
                        padding: 8,
                        borderRadius: 8,
                        fontSize: 20,
                        backgroundColor: colors.background.nav,
                        color: colors.primary.main,
                        fontFamily: '300'
                    }}
                    autoComplete="off"
                    placeholder="Password"
                    placeholderTextColor={colors.primary.main}
                    value={s_password}
                    onChangeText={handleSignUpCredentials('s_password')}
                />
                <TextInput
                    style={{
                        padding: 8,
                        borderRadius: 8,
                        fontSize: 20,
                        backgroundColor: colors.background.nav,
                        color: colors.primary.main,
                        fontFamily: '300'
                    }}
                    autoComplete="off"
                    placeholder="Re-enter Password"
                    placeholderTextColor={colors.primary.main}
                    value={r_password}
                    onChangeText={handleSignUpCredentials('r_password')}
                />
            </View>

            <View style={{ flexDirection: 'row', gap: 8, marginTop: 42 }}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? colors.background.paperOne : colors.background.nav,
                        }, { padding: 14, width: 100, alignItems: 'center', borderRadius: 8 }
                    ]}
                    onPress={() => onSignUp(SignUpType.Email)}>
                    <Text style={{ fontSize: 16, color: colors.primary.main, fontFamily: '500' }}>Signup</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? colors.background.paperOne : colors.background.nav,
                        }, { borderRadius: 8, width: 50, justifyContent: 'center', alignItems: 'center' }
                    ]}
                    onPress={() => onSignUp(SignUpType.Google)}
                >
                    <Ionicons name="logo-google" size={34} color={colors.primary.main} />
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? colors.background.paperOne : colors.background.nav,
                        }, { borderRadius: 8, width: 50, justifyContent: 'center', alignItems: 'center' }
                    ]}
                    onPress={() => onSignUp(SignUpType.Facebook)}
                >
                    <Ionicons name="logo-facebook" size={34} color={colors.primary.main} />
                </Pressable>
            </View>

            <View style={{ marginTop: 16, width: '90%', gap: 10, alignItems: 'center', }}>
                <Text style={{ color: colors.primary.newWhite, fontSize: 16, fontFamily: '300' }}>Already have an Account?</Text>
                <Pressable onPress={() => handleAuthPageStates(0)}>
                    <Text style={{ color: colors.primary.main, fontSize: 16, fontFamily: '300' }}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Signup