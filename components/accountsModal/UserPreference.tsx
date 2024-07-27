import React, { useState } from 'react'
import Switch from '../global/Switch'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/theme'

// Preference saving check later
const UserPreference = ({ preferences }: { preferences: { collapsedSidebar: boolean, dashboardHover: boolean, theme: boolean } }) => {
    const { colors, setScheme, isDark } = useTheme()
    const [defaultPreferences, setDefaultPreferences] = useState(preferences)
    const [userPreference, setUserPreference] = useState(preferences)

    const changeTheme = () => {
        if (isDark) {
            setScheme('light');
        } else {
            setScheme('dark');
        }
    }

    const handlePreferenceToggle = (preferenceType: keyof typeof userPreference) => {
        setUserPreference({ ...userPreference, [preferenceType]: !userPreference[preferenceType] })
        if (preferenceType === 'theme') {
            changeTheme()
        }
    }

    return (
        <View style={{ ...styles.preference, backgroundColor: colors.background.paperOne }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400' }}>Theme</Text>
                <Switch label={'theme'} value={userPreference.theme} onValueChange={handlePreferenceToggle} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400' }}>Dashboard Hover</Text>
                <Switch label={'dashboardHover'} value={userPreference.dashboardHover} onValueChange={handlePreferenceToggle} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400' }}>Collapsed Sidebar</Text>
                <Switch label={'collapsedSidebar'} value={userPreference.collapsedSidebar} onValueChange={handlePreferenceToggle} />
            </View>
        </View>
    )
}

export default UserPreference

const styles = StyleSheet.create({
    preference: {
        width: '90%',
        borderRadius: 16,
        gap: 8,
        margin: 8,
        padding: 8
    }
})