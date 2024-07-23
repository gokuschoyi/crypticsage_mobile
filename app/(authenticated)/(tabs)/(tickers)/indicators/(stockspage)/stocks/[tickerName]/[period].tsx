import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ScreenBody from '@/components/global/ScreenBody'

const period = () => {
    console.log(useLocalSearchParams())
    return (
        <ScreenBody>
            <Text style={{ color: '#fff' }}>Chart data for stocks</Text>
        </ScreenBody>
    )
}

export default period