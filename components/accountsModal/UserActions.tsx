import * as Haptics from 'expo-haptics';
import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';
import { useRouter } from 'expo-router';
import { resetAuthState } from '@/reduxSlice/authSlice'
import { resetStatsState } from '@/reduxSlice/statsSlice'
import { resetModelsInProgress } from '@/reduxSlice/intermediateModelSlice'
import { useDispatch } from 'react-redux';

const UserActions = () => {
    const { colors } = useTheme()
    const router = useRouter();
    const dispatch = useDispatch()

    const logoutUser = () => {
        console.log('Logging out user')
        dispatch(resetAuthState())
        dispatch(resetStatsState())
        dispatch(resetModelsInProgress())
        router.replace('/')
    }

    const handleOnPress = (action_type: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        switch (action_type) {
            case 'account':
                // router.push('/account')
                break;
            case 'learn':
                // router.push('/learn')
                break;
            case 'inbox':
                // router.push('/inbox')
                break;
            case 'logout':
                logoutUser()
                break;
            default:
                break;
        }
    }

    return (
        <View style={{ ...styles.actions, backgroundColor: colors.background.paperOne }}>
            <Pressable
                style={
                    ({ pressed }) => [{
                        backgroundColor: pressed ? colors.background.nav : 'transparent', borderRadius: 16
                    }, styles.btn]}
                onPress={() => handleOnPress('account')}>
                <Ionicons name="person" size={24} color={colors.text.secondary} />
                <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400' }}>Account</Text>
            </Pressable>

            <Pressable style={
                ({ pressed }) => [{
                    backgroundColor: pressed ? colors.background.nav : 'transparent', borderRadius: 16
                }, styles.btn]}
                onPress={() => handleOnPress('learn')}>
                <Ionicons name="bulb" size={24} color={colors.text.secondary} />
                <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400' }}>Learn</Text>
            </Pressable>

            <Pressable style={
                ({ pressed }) => [{
                    backgroundColor: pressed ? colors.background.nav : 'transparent', borderRadius: 16
                }, styles.btn]}
                onPress={() => handleOnPress('inbox')}>
                <Ionicons name="megaphone" size={24} color={colors.text.secondary} />
                <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400', flex: 1 }}>Inbox</Text>
                <View
                    style={{
                        backgroundColor: colors.primary.main,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        justifyContent: 'center',
                    }}>
                    <Text style={{ color: '#fff', fontSize: 12 }}>14</Text>
                </View>
            </Pressable>

            <Pressable style={
                ({ pressed }) => [{
                    backgroundColor: pressed ? colors.background.nav : 'transparent', borderRadius: 16
                }, styles.btn]}
                onPress={() => handleOnPress('logout')}>
                <Ionicons name="log-out" size={24} color={colors.text.secondary} />
                <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400' }}>Log out</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    actions: {
        borderRadius: 16,
        gap: 0,
        width: '90%',
    },
    btn: {
        padding: 14,
        flexDirection: 'row',
        gap: 20,
    }
})


export default UserActions