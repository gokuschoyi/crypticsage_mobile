import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ScreenBody from '@/components/global/ScreenBody'

const crypto = () => {
    const router = useRouter();
    return (
        <ScreenBody>
            <Text style={{ color: '#fff' }}>Crypto Ticker list</Text>
            <Button title="Go to Stocks" onPress={() => router.push('indicators/stocks')} />
            <Button title="Go to chart" onPress={() => router.push('indicators/crypto/BTCUSDT/4h')} />
        </ScreenBody>
    )
}

export default crypto