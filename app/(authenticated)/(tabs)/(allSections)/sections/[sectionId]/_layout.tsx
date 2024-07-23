import React from 'react';
import { Stack } from 'expo-router';

export default function SectionIdLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[lessonId]" options={{ headerShown: false }} />
        </Stack>
    );
}