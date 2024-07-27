import { useRouter, useRootNavigationState, useSegments, useNavigationContainerRef } from "expo-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BackHandler, Alert } from "react-native";

function useExtendedRouter() {
    const [isNavigationReady, setIsNavigationReady] = useState(false);
    const router = useRouter();
    const navigationContainerRef = useNavigationContainerRef();
    useEffect(() => {
        const sub = navigationContainerRef.addListener("state", () => {
            setIsNavigationReady(true);
        });
        return () => {
            if (sub) {
                sub();
            }
        };
    }, [navigationContainerRef]);
    return { isReady: isNavigationReady, ...router };
}

export function useProtectedRoute() {
    const router = useExtendedRouter();
    // console.log('test_router', router.isReady)
    // const router = useRouter();
    const segments = useSegments();
    const navigationState = useRootNavigationState();
    const token = useSelector((state: any) => state.auth.accessToken);

    // console.log('segments', segments)
    // console.log('segments', segments.length)
    // console.log('navigationState', navigationState?.key)

    const backAction = () => {
        if (token) {
            Alert.alert(
                "Hold on!",
                "Are you sure you want to exit the app?",
                [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "YES",
                        onPress: () => BackHandler.exitApp()
                    }
                ]
            );
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        // console.log('UE AUTH GUARD')
        const inAuthGroup = segments[0] === "(authenticated)";
        const user = token ? true : false;
        // console.log('user and auth grp', user, inAuthGroup)

        if (router.isReady) {
            if (!user && !inAuthGroup) {
                console.log('case 1')
                router.push("/");
            } else if (user && !inAuthGroup) {
                console.log('case 2')
                router.push("/(authenticated)/(tabs)/stats");
            }
        }
        // else {
        // console.log('no nav state')
        // return;
        // }

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [token, segments, router.isReady]);
}

