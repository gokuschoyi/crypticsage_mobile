import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ScreenBody from '@/components/global/ScreenBody'

export default function QuizDetailScreen() {
    const { quizId } = useLocalSearchParams();

    return (
        <ScreenBody>
            <Text style={{ color: '#fff' }}>Quiz Detail for {quizId}</Text>
        </ScreenBody>
    );
}
