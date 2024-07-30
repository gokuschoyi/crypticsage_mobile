// @ts-nocheck
import { View } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme'

const ScreenBody = (props) => {
    const { colors } = useTheme();
    return (
        <View style={{ backgroundColor: colors.background.nav, flex: 1 }}>
            {props.children}
        </View>
    )
}

export default ScreenBody