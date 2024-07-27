import * as Haptics from 'expo-haptics';
import React from 'react'
import { View, Text, Pressable, TextInput, ActivityIndicator } from 'react-native'
import { useTheme } from '@/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LoginUser } from '@/api/auth';
import { process_login } from '@/utils';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@/reduxSlice/authSlice';
import { setRecentLessonAndQuizStatus, setWordOfTheDay } from '@/reduxSlice/statsSlice';
import { setModelsInProgress } from '@/reduxSlice/intermediateModelSlice'
import Toast from 'react-native-toast-message';
import GoogleAuth from "./GoogleAuth";

enum SignInType {
    Email,
    Google,
    Facebook,
}

import { useRouter } from 'expo-router';

const Login = ({ handleAuthPageStates }: { handleAuthPageStates: (page: number) => void }) => {

    const { colors, toastColors } = useTheme();
    const dispatch = useDispatch();
    const router = useRouter();
    const [{ email, password }, setCredentials] = React.useState({ email: '', password: '' });
    const [hidePassword, setHidePassword] = React.useState(true);

    const [loading, setLoading] = React.useState(false);

    const togglePassword = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        setHidePassword((prev) => !prev);
    }

    const handleCredentials = (key: string) => (value: string) => {
        // console.log('Setting', key, 'to', value);
        setCredentials((prev) => ({ ...prev, [key]: value }));
    }

    const onSignIn = async (type: SignInType) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        switch (type) {
            case SignInType.Email:
                console.log('Email Login',)
                if (email === '' || password === '') {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Email or Password cannot be empty.',
                        props: { ...toastColors.error }
                    });
                } else {
                    setLoading(true);
                    const data = {
                        login_type: 'emailpassword',
                        email: email,
                        password: password
                    }

                    try {
                        const loginResult = await LoginUser(data);
                        // console.log('Login Result:', loginResult)
                        const userData = process_login(loginResult)
                        // console.log('Login Result:', userData.preferences)

                        dispatch(setAuthState(userData))
                        dispatch(setRecentLessonAndQuizStatus(loginResult?.data?.recent_lesson_quiz))
                        dispatch(setWordOfTheDay(loginResult?.data.word))
                        dispatch(setModelsInProgress(loginResult?.data.in_progress_models))
                        setLoading(false);
                        // router.replace('/(authenticated)/(tabs)/stats');

                    } catch (error) {
                        console.log('Error : Login', error)
                    }
                }
                break;
            case SignInType.Google:
                console.log('Google:',)
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'Google Sign-in is not available',
                });
                break;
            default:
                console.log('Facebook:',)
                Toast.show({
                    type: 'info',
                    text1: 'Info',
                    text2: 'Facebook Sign-in is not available',
                });
                break;
        }
    };

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '90%', gap: 20 }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <Text style={{ color: colors.primary.main, fontSize: 42, fontFamily: '400' }}>Login</Text>
                    {loading &&
                        <ActivityIndicator size="small" color={colors.primary.main} style={{ paddingTop: 8 }} />
                    }
                </View>
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
                    onChangeText={handleCredentials('email')}
                />
                <View style={{
                    flexDirection: 'row'
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
                        value={password}
                        onChangeText={handleCredentials('password')}
                    />
                    <Pressable
                        onPress={() => togglePassword()}
                    >{hidePassword ?
                        <MaterialIcons name="visibility" size={24} color={colors.primary.main} /> :
                        <MaterialIcons name="visibility-off" size={24} color={colors.primary.main} />
                        }
                    </Pressable>
                </View>
            </View>

            <View style={{ marginTop: 16, width: '90%', alignItems: 'flex-end', }}>
                <Pressable
                    onPress={() => handleAuthPageStates(1)}
                >
                    <Text style={{ color: colors.primary.main, fontSize: 16, fontFamily: '300' }}>Forgot Password?</Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', gap: 8, marginTop: 42 }}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? colors.background.paperOne : colors.background.nav,
                        }, { padding: 14, width: 100, alignItems: 'center', borderRadius: 8 }
                    ]}
                    onPress={() => onSignIn(SignInType.Email)}>
                    {({ pressed }) => (
                        <Text style={{ fontSize: 16, fontFamily: '500', color: pressed ? colors.text.primary : colors.primary.main }}>
                            Login
                        </Text>
                    )}
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? colors.background.paperOne : colors.background.nav,
                        }, { borderRadius: 8, width: 50, justifyContent: 'center', alignItems: 'center' }
                    ]}
                    onPress={() => onSignIn(SignInType.Google)}
                >
                    <GoogleAuth />
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? colors.background.paperOne : colors.background.nav,
                        }, { borderRadius: 8, width: 50, justifyContent: 'center', alignItems: 'center' }
                    ]}
                    onPress={() => onSignIn(SignInType.Facebook)}
                >
                    <Ionicons name="logo-facebook" size={34} color={colors.primary.main} />
                </Pressable>
            </View>

            <View style={{ marginTop: 32 }}>
                <View style={{ gap: 8, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontFamily: '300' }}>Don't have an Account?</Text>
                    <Pressable
                        onPress={() => handleAuthPageStates(2)}
                    >
                        <Text style={{ color: colors.primary.main, fontSize: 16, fontFamily: '300' }}>Sign-up here</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

export default Login