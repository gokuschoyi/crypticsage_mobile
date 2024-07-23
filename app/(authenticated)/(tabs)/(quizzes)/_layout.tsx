import React from 'react';
import { Stack } from 'expo-router';

export default function QuizLayout() {
    return (
        <Stack>
            <Stack.Screen name="quiz" options={{ headerShown: false }} />
            <Stack.Screen name="quiz/[quizId]" options={{ headerShown: false }} />
        </Stack>
    );
}