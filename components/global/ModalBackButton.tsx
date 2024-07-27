import * as Haptics from 'expo-haptics';
import React from 'react'
import { Pressable } from 'react-native'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme';

const ModalBackButton = () => {
    const router = useRouter();
    const { colors } = useTheme()

    const goBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        router.back()
    }

    return (
        <Pressable onPress={() => goBack()}>
            <Ionicons name="close-outline" size={34} color={colors.primary.main} />
        </Pressable>
    )
}

export default ModalBackButton