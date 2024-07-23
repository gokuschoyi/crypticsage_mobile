import { Stack } from 'expo-router';

export default function SectionsLayout() {
    return (
        <Stack>
            <Stack.Screen name="sections" options={{ headerShown: false }}/>
            <Stack.Screen name="sections/[sectionId]" options={{ headerShown: false }} />
        </Stack>
    );
}