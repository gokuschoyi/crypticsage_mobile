import React from 'react'
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native'

import { useTheme } from '@/theme';
type User = {}
export default function GoogleAuth() {
    const { colors } = useTheme();
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState<User | null>(null);

    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: process.env.EXPO_GOOGLE_OAUTH_CLIENT_ID,
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo_ = await GoogleSignin.signIn();
            console.log(JSON.stringify(userInfo_, null, 2));
            setUserInfo(userInfo_);
            setLoggedIn(true);
        } catch (error: any) {
            // console.log(statusCodes);
            // console.log(JSON.stringify(error, null, 2));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setLoggedIn(false);
            setUserInfo(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Pressable
            style={{
                backgroundColor: colors.background.nav
                , borderRadius: 8
                , width: 50
                , justifyContent: 'center'
                , alignItems: 'center'
            }}
            onPress={loggedIn ? signOut : signIn}
        >
            <Ionicons name="logo-google" size={34} color={colors.primary.main} />
        </Pressable>
    )
}