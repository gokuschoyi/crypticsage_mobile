import * as Haptics from 'expo-haptics';
import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useTheme } from '@/theme'
import ParallaxStar from "@/components/auth/ParallaxStar";
import Login from "@/components/auth/Login";
import ForgotPassword from "@/components/auth/ForgotPassword";
import Signup from "@/components/auth/Signup";

const components = [Login, ForgotPassword, Signup];

const Page = () => {
    const [authStateIndex, setAuthStateIndex] = React.useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current
    const { colors } = useTheme();

    useEffect(() => {
        fadeIn();
    }, [authStateIndex]);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = (callback: () => void) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start(() => callback && callback());
    };

    const handleAuthPageStates = (type: React.SetStateAction<number>) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        console.log('Navigating to', type);
        fadeOut(() => setAuthStateIndex(type));
        // setAuthStateIndex(type);
    }

    const AuthComponent = components[authStateIndex];

    return (
        <View style={{ flex: 1 }}>
            <ParallaxStar />
            <View style={{
                flex: 1,
                width: '100%',
                height: '100%',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Animated.View style={{
                    opacity: fadeAnim,
                    width: '100%',
                    alignItems: 'center',
                }}>
                    <AuthComponent handleAuthPageStates={handleAuthPageStates} />
                </Animated.View>

                <View style={{ position: 'absolute', bottom: 10, justifyContent: 'flex-end' }}>
                    <Text style={{
                        width: '100%',
                        fontSize: 20,
                        color: colors.primary.main,
                        fontWeight: '500',
                        marginTop: 80,
                        letterSpacing: 2,
                        textAlign: 'center',
                        fontFamily: '500'
                    }}>CRYPTICSAGE</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        fontSize: 44,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 80,
        textAlign: 'center',
    },
    inputContainer: {
        width: '90%',
        gap: 20,
        marginVertical: 140,
    },
    input: {
        padding: 8,
        borderRadius: 8,
        fontSize: 20,
        backgroundColor: '#fff',
    }
})

export default Page;
