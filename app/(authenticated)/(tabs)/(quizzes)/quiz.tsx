import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ScreenBody from '@/components/global/ScreenBody'

const index = () => {
    const router = useRouter();
    return (
        <ScreenBody>
            <Text style={{ color: '#fff' }}>Quiz Main</Text>
            <Button title="Go to Quiz 1" onPress={() => router.push('quiz/44')} />
        </ScreenBody>
    )
}

export default index