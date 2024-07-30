import React, { useRef, useReducer, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native';
import { FontAwesome5, Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useTheme } from '@/theme';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
dayjs.extend(duration);

import { getIconName } from './NotificationUtils';
import { SingleNotificationItemProps } from '@/components/notifications/types'

enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARN = 'warn'
}

const TimeTracker = ({ createdAt, color }: { createdAt: number, color: string }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const intervalRef = useRef<NodeJS.Timeout | undefined>();
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            forceUpdate();
        }, 60000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);
    return (
        <View>
            <Text style={{ fontSize: 12, fontFamily: '300', color: color }}>
                {dayjs(createdAt).fromNow()}
            </Text>
        </View>
    );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;

const ListItem: React.FC<SingleNotificationItemProps> = ({ item, onDelete, onMarkAsRead, toggleReadMessages }) => {
    const { colors } = useTheme();
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(item.seen ? 0 : item.toast_data.height);
    const marginVertical = useSharedValue(item.seen ? 0 : 4);
    const opacity = useSharedValue(item.seen ? 0 : 1);

    useEffect(() => {
        if (toggleReadMessages === 'unread') {
            if (item.seen) {
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                opacity.value = withTiming(0);
            }
        } else {
            itemHeight.value = withTiming(item.toast_data.height);
            marginVertical.value = withTiming(4);
            opacity.value = withTiming(1);
        }
    }, [toggleReadMessages, item.seen]);

    const animatedDelete = (id: string) => {
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
                // @ts-ignore
                runOnJS(onDelete)(id);
            }
        });
    }

    const panGesture = Gesture.Pan()
        .minDistance(40)
        .onUpdate((event) => {
            translateX.value = event.translationX;
        })
        .onEnd((event) => {
            const setAsRead = translateX.value > -TRANSLATE_X_THRESHOLD;
            const shouldDelete = translateX.value < TRANSLATE_X_THRESHOLD;
            if (shouldDelete) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                marginVertical.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished) {
                        // @ts-ignore
                        runOnJS(onDelete)(item.toast_id);
                    }
                });
            } else if (setAsRead) {
                translateX.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished) {
                        // @ts-ignore
                        runOnJS(onMarkAsRead)(item.toast_id);
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        });

    const rStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }]
    }));

    const rDeleteIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
        return { opacity };
    });

    const rMarkAsReadIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(translateX.value > -TRANSLATE_X_THRESHOLD ? 1 : 0);
        return { opacity };
    })

    const rTaskContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginVertical: marginVertical.value,
            opacity: opacity.value,
        };
    });

    const iconName = getIconName(item.toast_data.type as ToastType);

    return (
        <Animated.View style={[rTaskContainerStyle, { width: '90%' }]}>
            <Animated.View style={[styles.deleteIcon, rDeleteIconContainerStyle]}>
                <FontAwesome5
                    name={'trash-alt'}
                    size={20}
                    color={'red'}
                />
            </Animated.View>

            <Animated.View style={[styles.markAsReadIcon, rMarkAsReadIconContainerStyle]}>
                <MaterialCommunityIcons
                    name={'read'}
                    size={20}
                    color={item.seen ? colors.success.main : colors.primary.main}
                />
            </Animated.View>

            <GestureDetector gesture={panGesture}>
                <Animated.View
                    style={[
                        styles.notificationContainer
                        , rStyle
                        , {
                            borderLeftColor: item.toast_data.props.border,
                            backgroundColor: colors.background.nav
                        }
                    ]}
                >
                    <Animated.View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Feather name={iconName} size={16} color={item.toast_data.props.border} />
                        <TimeTracker createdAt={item.created_at} color={colors.text.primary} />
                    </Animated.View>

                    <Animated.View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {item.toast_data.type === 'customWarn' && (
                            <View style={{ width: '85%' }}>
                                <Text style={{ fontSize: 12, fontFamily: '300', color: colors.text.primary }}>{item.toast_data.props.error_message}</Text>
                                <Text style={{ fontSize: 12, fontFamily: '300', color: colors.text.primary }}>{`\u2022 ${item.toast_data.props.test_possible}`}</Text>
                                <Text style={{ fontSize: 12, fontFamily: '300', color: colors.text.primary }}>{`\u2022 ${item.toast_data.props.train_possible}`}</Text>
                            </View>
                        )}
                        {(item.toast_data.type === 'customError') && (
                            <View style={{ width: '85%' }}>
                                <Text style={{ fontSize: 12, fontFamily: '300', color: colors.text.primary }}>{item.toast_data.props.message} at step {item.toast_data.props.step}</Text>
                                <Text style={{ fontSize: 12, fontFamily: '300', color: colors.text.primary }}>{`\u2022 ${item.toast_data.props.func_error}`}</Text>
                            </View>
                        )}
                        {(item.toast_data.type === 'success' || item.toast_data.type === 'error' || item.toast_data.type === 'warn' || item.toast_data.type === 'info') && (
                            <View style={{ width: '85%' }}>
                                <Text style={{ fontSize: 12, fontFamily: '300', color: colors.text.primary }}>{item.toast_data.text2}</Text>
                            </View>
                        )}

                        <Animated.View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                            {item.seen ? (
                                <View style={{ flexDirection: 'row' }}>
                                    <Feather name="check" size={24} color={colors.success.main} />
                                    <Feather style={{ position: 'absolute', transform: [{ translateX: 4 }, { translateY: 0 }], zIndex: -1 }} name="check" size={24} color={colors.success.main} />
                                </View>
                            ) : (
                                <Pressable onPress={() => onMarkAsRead(item.toast_id)}>
                                    <Feather name="check" size={24} color={colors.text.primary} />
                                </Pressable>
                            )
                            }
                            <Pressable onPress={() => animatedDelete(item.toast_id)}>
                                <MaterialIcons name="delete" size={24} color={colors.primary.main} />
                            </Pressable>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    deleteIcon: {
        position: 'absolute',
        right: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markAsReadIcon: {
        position: 'absolute',
        left: 16,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationContainer: {
        alignItems: 'center',
        flex: 1,
        padding: 8,
        borderLeftWidth: 2,
        borderRadius: 8,
        gap: 4,

        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        // Shadow for Android
        elevation: 5,
    }
});

export default ListItem;