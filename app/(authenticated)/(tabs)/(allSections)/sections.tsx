import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'
import ScreenBody from '@/components/global/ScreenBody'

const Index = () => {
    const router = useRouter();
    return (
        <ScreenBody>
            <Text style={{ color: '#fff' }}>Sections Main</Text>
            <Button title="Go to Section 1" onPress={() => router.push('/sections/1')} />
            <Button title="Sitemap" onPress={() => router.push('_sitemap')} />
        </ScreenBody>
    )
}

export default Index