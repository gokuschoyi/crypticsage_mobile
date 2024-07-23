import { Stack } from 'expo-router';
import React from 'react';

export default function SectionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="crypto" options={{ headerShown: false }} />
            <Stack.Screen name="crypto/[tickerName]/[period]" options={{ headerShown: false }} />
        </Stack>
    );
}