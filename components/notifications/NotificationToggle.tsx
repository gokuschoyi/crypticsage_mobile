import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/theme';
import * as Haptics from 'expo-haptics';

const NotificationToggle = ({ unreadCount, handleReadMessages }: { unreadCount: number, handleReadMessages: (type: string) => void }) => {
    const { colors } = useTheme();

    // Shared values for active states
    const isUnreadActive = useSharedValue(1);
    const isAllActive = useSharedValue(0);

    // Animated styles for the border
    const unreadBorderStyle = useAnimatedStyle(() => ({
        borderBottomWidth: withTiming(isUnreadActive.value ? 2 : 0),
        borderBottomColor: colors.primary.main,
    }));

    const allBorderStyle = useAnimatedStyle(() => ({
        borderBottomWidth: withTiming(isAllActive.value ? 2 : 0),
        borderBottomColor: colors.primary.main,
    }));

    // Function to handle toggle
    const handleToggleReadMessages = (type: 'unread' | 'all') => {
        if (type === 'unread') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            handleReadMessages('unread');
            isUnreadActive.value = 1;
            isAllActive.value = 0;
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            handleReadMessages('all');
            isUnreadActive.value = 0;
            isAllActive.value = 1;
        }
    };

    return (
        <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 20 }}>
            <Pressable
                onPress={() => handleToggleReadMessages('unread')}
                style={{ flex: 1, alignItems: 'center' }}
            >
                <Animated.View style={[unreadBorderStyle, { width: '100%', alignItems: 'center' }]}>
                    <Text style={{ paddingBottom: 4, color: colors.text.primary, fontSize: 24, fontFamily: '500' }}>Unread {unreadCount > 0 && `(${unreadCount})`}</Text>
                </Animated.View>
            </Pressable>
            <Pressable
                onPress={() => handleToggleReadMessages('all')}
                style={{ flex: 1, alignItems: 'center' }}
            >
                <Animated.View style={[allBorderStyle, { width: '100%', alignItems: 'center' }]}>
                    <Text style={{ paddingBottom: 4, color: colors.text.primary, fontSize: 24, fontFamily: '500' }}>All</Text>
                </Animated.View>
            </Pressable>
        </View>
    );
};

export default NotificationToggle;
