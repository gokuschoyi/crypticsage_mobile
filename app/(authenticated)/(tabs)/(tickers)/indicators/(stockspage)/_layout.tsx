import { Stack } from 'expo-router';
import React from 'react';

export default function SectionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="stocks" options={{ headerShown: false }} />
            <Stack.Screen name="stocks/[tickerName]/[period]" options={{ headerShown: false }} />
        </Stack>
    );
}