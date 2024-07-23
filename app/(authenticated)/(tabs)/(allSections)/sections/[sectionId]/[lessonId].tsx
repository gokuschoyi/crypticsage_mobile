import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import ScreenBody from '@/components/global/ScreenBody'

const lesson = () => {
    const { sectionId, lessonId } = useLocalSearchParams();
    return (
        <ScreenBody>
            <Text style={{ color: '#fff' }}>Lesson Detail for Section {sectionId}, Lesson {lessonId}</Text>
        </ScreenBody>
    )
}

export default lesson