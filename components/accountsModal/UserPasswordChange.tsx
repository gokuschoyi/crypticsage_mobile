import * as Haptics from 'expo-haptics';
import React from 'react'
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '@/theme'
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { verifyPassword, updatePassword } from '@/api/user';
import NotificationsHandler from '@/components/notifications/NotificationsHandler';

const UserPasswordChange = () => {
    const accessToken = useSelector((state: any) => state.auth.accessToken)
    const { showNotification } = NotificationsHandler()
    const { colors, toastColors } = useTheme()
    const [hidePassword, setHidePassword] = React.useState(true);
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);

    const togglePassword = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setHidePassword((prev) => !prev);
    }

    const verifyCurrentPassword = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        // console.log('Verifying password')
        let data = {
            token: accessToken,
            payload: {
                password: currentPassword
            }
        }

        verifyPassword(data)
            .then((res) => {
                // console.log(res.data.validPassword)
                setIsPasswordValid(res.data.validPassword)
            })
            .catch((err) => {
                setIsPasswordValid(false)
                showNotification({
                    type: 'error',
                    text1: 'Error',
                    text2: err.response.data.message,
                    props: { ...toastColors.error }
                })
            })
    }

    const [password, setPassword] = React.useState({ newPassword: { value: '', error: '' }, confirmNewPassword: { value: '', error: '' } })

    const handleNewPassword = (key: string) => (value: string) => {
        // console.log('Setting', key, 'to', value);
        if (key === 'newPassword') {
            if (value.length > 1 && value.length < 6) {
                setPassword((prev) => ({ ...prev, [key]: { value: value, error: 'Password must be atleast 6 characters long' } }));
            } else {
                setPassword((prev) => ({ ...prev, [key]: { value: value, error: '' } }));
            }
        } else {
            if (value.length > 1 && value !== password.newPassword.value) {
                setPassword((prev) => ({ ...prev, [key]: { value: value, error: 'Passwords do not match' } }));
            } else {
                setPassword((prev) => ({ ...prev, [key]: { value: value, error: '' } }));
            }
        }
    }

    const handleClosePasswordChange = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setCurrentPassword('')
        setIsPasswordValid(false)
        setPassword({ newPassword: { value: '', error: '' }, confirmNewPassword: { value: '', error: '' } })
    }

    const handleSaveNewPassword = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        // console.log('Saving new password')
        let data = {
            token: accessToken,
            payload: {
                password: password.newPassword.value
            }
        }

        updatePassword(data)
            .then((res) => {
                handleClosePasswordChange()
                showNotification({
                    type: 'success',
                    text1: 'Success',
                    text2: res.data.message,
                    props: { ...toastColors.success }
                })
            })
            .catch((err) => {
                showNotification({
                    type: 'error',
                    text1: 'Error',
                    text2: err.response.data.message,
                    props: { ...toastColors.error }
                })
            })
    }

    return (
        <View style={{ ...styles.current_password, backgroundColor: colors.background.paperOne }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontFamily: '400', color: colors.text.primary }}>Change Password</Text>
                {isPasswordValid && (
                    <Pressable onPress={handleClosePasswordChange}>
                        <Ionicons name="close-outline" size={28} color={colors.primary.main} />
                    </Pressable>

                )}
            </View>
            <Text style={{ fontSize: 12, fontFamily: '300', color: colors.primary.main }}>Enter your current password to verify</Text>
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                <View style={{
                    flex: 1
                    , flexDirection: 'row'
                    , backgroundColor: colors.background.nav
                    , padding: 8
                    , borderRadius: 8
                }}>
                    <TextInput
                        style={{
                            flex: 1,
                            borderRadius: 8,
                            fontSize: 20,
                            backgroundColor: colors.background.nav,
                            color: colors.primary.main,
                            fontFamily: '300'
                        }}
                        secureTextEntry={hidePassword}
                        placeholder="Password"
                        placeholderTextColor={colors.primary.main}
                        value={currentPassword}
                        onChangeText={(val) => setCurrentPassword(val)}
                    />
                    <Pressable
                        onPress={() => togglePassword()}
                    >{hidePassword ?
                        <MaterialIcons name="visibility" size={24} color={colors.primary.main} /> :
                        <MaterialIcons name="visibility-off" size={24} color={colors.primary.main} />
                        }
                    </Pressable>
                </View>
                {currentPassword.length !== 0 &&
                    <Pressable disabled={isPasswordValid} onPress={() => verifyCurrentPassword()}>
                        <MaterialIcons name="start" size={34} color={colors.primary.main} />
                    </Pressable>
                }
            </View>

            {isPasswordValid && (
                <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 20, fontFamily: '400', color: colors.text.primary }}>Enter New Password</Text>
                    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                        <View style={{ gap: 8, flex: 1 }}>
                            <View>
                                <View style={{
                                    flex: 1
                                    , flexDirection: 'row'
                                    , backgroundColor: colors.background.nav
                                    , padding: 8
                                    , borderRadius: 8
                                }}>
                                    <TextInput
                                        style={{
                                            flex: 1,
                                            borderRadius: 8,
                                            fontSize: 20,
                                            backgroundColor: colors.background.nav,
                                            color: colors.primary.main,
                                            fontFamily: '300'
                                        }}
                                        secureTextEntry={hidePassword}
                                        placeholder="Password"
                                        placeholderTextColor={colors.primary.main}
                                        value={password.newPassword.value}
                                        onChangeText={handleNewPassword('newPassword')}
                                    />
                                    <Pressable
                                        onPress={() => togglePassword()}
                                    >{hidePassword ?
                                        <MaterialIcons name="visibility" size={24} color={colors.primary.main} /> :
                                        <MaterialIcons name="visibility-off" size={24} color={colors.primary.main} />
                                        }
                                    </Pressable>
                                </View>
                                {password.newPassword.error.length !== 0 && (
                                    <Text style={{ fontSize: 10, fontFamily: '300', color: colors.error.main }}>
                                        {password.newPassword.error}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <View style={{
                                    flex: 1
                                    , flexDirection: 'row'
                                    , backgroundColor: colors.background.nav
                                    , padding: 8
                                    , borderRadius: 8
                                }}>
                                    <TextInput
                                        style={{
                                            flex: 1,
                                            borderRadius: 8,
                                            fontSize: 20,
                                            backgroundColor: colors.background.nav,
                                            color: colors.primary.main,
                                            fontFamily: '300'
                                        }}
                                        secureTextEntry={hidePassword}
                                        placeholder="Password"
                                        placeholderTextColor={colors.primary.main}
                                        value={password.confirmNewPassword.value}
                                        onChangeText={handleNewPassword('confirmNewPassword')}
                                    />
                                    <Pressable
                                        onPress={() => togglePassword()}
                                    >{hidePassword ?
                                        <MaterialIcons name="visibility" size={24} color={colors.primary.main} /> :
                                        <MaterialIcons name="visibility-off" size={24} color={colors.primary.main} />
                                        }
                                    </Pressable>
                                </View>
                                {password.confirmNewPassword.error.length !== 0 && (
                                    <Text style={{ fontSize: 10, fontFamily: '300', color: colors.error.main }}>
                                        {password.confirmNewPassword.error}
                                    </Text>
                                )}
                            </View>
                        </View>

                        {
                            password.newPassword.value.length >= 6 &&
                            password.newPassword.value === password.confirmNewPassword.value &&
                            password.newPassword.error === '' &&
                            password.confirmNewPassword.error === '' && (
                                <Pressable onPress={() => handleSaveNewPassword()}>
                                    <AntDesign name="save" size={30} color={colors.primary.main} />
                                </Pressable>
                            )
                        }
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    current_password: {
        width: '90%',
        borderRadius: 16,
        gap: 8,
        margin: 8,
        padding: 8
    }
})

export default UserPasswordChange