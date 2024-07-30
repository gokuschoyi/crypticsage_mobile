import * as Haptics from 'expo-haptics';
import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';

const ModalBackButton = ({ type }: { type?: string }) => {
    const router = useRouter();
    const { colors } = useTheme()

    const goBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        router.back()
    }

    return (
        <View style={{ flexDirection: 'row', height: 75, justifyContent: 'space-between' }}>
            {type === 'notification' && (
                <View style={{ justifyContent: 'center', marginRight: 100 }}>
                    <Text style={{ color: colors.text.primary, fontFamily: '400', fontSize: 24 }}>Notifications</Text>
                </View>
            )}
            <View style={{ justifyContent: 'center', marginRight: 8 }}>
                <Pressable onPress={() => goBack()}>
                    <Ionicons name="close-outline" size={34} color={colors.primary.main} />
                </Pressable>
            </View>
        </View>
    )
}

export default ModalBackButton