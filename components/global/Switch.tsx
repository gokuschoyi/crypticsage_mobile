import * as Haptics from 'expo-haptics';
import React from 'react'
import {
    Pressable,
    View,
    Animated,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/theme';


const Switch = (props: any) => {
    const { colors } = useTheme();

    const defaultStyles = {
        bgGradientColors: [colors.background.default, colors.primary.main],
        headGradientColors: ['#ffffff', '#E1E4E8'],
    };

    const activeStyles = {
        bgGradientColors: [colors.primary.main, colors.background.default],
        headGradientColors: ['#444D56', '#0E1723'],
    };

    const { label, value, onValueChange } = props;
    const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

    useEffect(() => {
        // Update the animated value when the value prop changes
        Animated.timing(animatedValue, {
            toValue: value ? 1 : 0,
            duration: 300, // Adjust the animation duration
            useNativeDriver: false,
        }).start();
    }, [value]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [6, 24], // Adjust the distance of the switch head
    });

    const toggleSwitch = () => {
        const newValue = !value;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        onValueChange(label);
    };

    const currentStyles = value ? activeStyles : defaultStyles;

    return (
        <Pressable onPress={toggleSwitch} style={styles.pressable}>
            <LinearGradient
                colors={currentStyles.bgGradientColors}
                style={styles.backgroundGradient}
                start={{
                    x: 0,
                    y: 0.5,
                }}>
                <View style={styles.innerContainer}>
                    <Animated.View
                        style={{
                            transform: [{ translateX }],
                        }}>
                        <LinearGradient
                            colors={currentStyles.headGradientColors}
                            style={styles.headGradient}
                        />
                    </Animated.View>
                </View>
            </LinearGradient>
        </Pressable>
    );
}

export default Switch

const styles = StyleSheet.create({
    pressable: {
        width: 50,
        height: 28,
        borderRadius: 16,
    },
    backgroundGradient: {
        borderRadius: 16,
        flex: 1,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },
    headGradient: {
        width: 20,
        height: 20,
        borderRadius: 100,
    },
});