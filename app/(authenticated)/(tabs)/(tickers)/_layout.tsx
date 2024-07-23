import { Stack } from 'expo-router';

export default function SectionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="indicators" options={{ headerShown: false }} />
        </Stack>
    );
}