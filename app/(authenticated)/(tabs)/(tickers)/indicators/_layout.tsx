import { Stack } from 'expo-router';

export default function SectionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="(cryptopage)" options={{ headerShown: false }} />
            <Stack.Screen name="(stockspage)" options={{ headerShown: false }} />
        </Stack>
    );
}