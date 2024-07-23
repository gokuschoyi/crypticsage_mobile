import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

import ScreenBody from '@/components/global/ScreenBody'

const stocks = () => {
    const router = useRouter();
    return (
        <ScreenBody>
            <Text style={{ color: '#fff' }}>Stocks ticker list</Text>
            <Button title="Go to Crypto" onPress={() => router.back()} />
            <Button title="Go to chart" onPress={() => router.push('indicators/stocks/AAPL/1d')} />
        </ScreenBody>
    )
}

export default stocks