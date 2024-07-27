import { View, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@/theme';
import {
    UserPicture,
    UserNameAndPhone,
    UserActions,
    UserPreference,
    UserPasswordChange
} from '@/components/accountsModal'

const account = () => {
    const { colors } = useTheme()
    // @ts-ignore
    const { displayName, preferences, mobile_number, photoUrl } = useSelector(state => state.auth)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingcontainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust the offset as needed
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.accounts}>
                        <View style={styles.headerContainer}>
                            <UserNameAndPhone displayName={displayName} mobile_number={mobile_number} />
                            <UserPicture photoUrl={photoUrl} />
                        </View>
                        <UserActions />
                        <UserPreference preferences={preferences} />
                        <UserPasswordChange />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    keyboardAvoidingcontainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    accounts: {
        marginTop: 100,
        gap: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        gap: 16,
        width: '100%',
        paddingLeft: 22,
        paddingRight: 22,
    }
});

export default account