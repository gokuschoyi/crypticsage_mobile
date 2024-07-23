import { View, Text, Button } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ScreenBody from '@/components/global/ScreenBody'

const index = () => {
    const { sectionId } = useLocalSearchParams();
    const router = useRouter();
    return (
        <ScreenBody>
            <Text style={{color:'#fff'}}>Individual Section Details for : {sectionId}</Text>
            <Button title="Go to Lesson" onPress={() => {
                router.push(`/sections/${sectionId}/2`)
            }} />
            <Button title="Go Back" onPress={() => {
                router.back()
            }} />
        </ScreenBody>
    )
}

export default index