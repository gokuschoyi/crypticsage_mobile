// @ts-nocheck
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ThemeProvider } from '../theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { usePathname } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import store, { persistor } from '../store';
import Toast from 'react-native-toast-message';
import toastConfig from '@/components/notifications/customToastConfig';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "100": require('../assets/fonts/Montserrat-Thin.ttf'),
    "200": require('../assets/fonts/Montserrat-ExtraLight.ttf'),
    "300": require('../assets/fonts/Montserrat-Light.ttf'),
    "400": require('../assets/fonts/Montserrat-Regular.ttf'),
    "500": require('../assets/fonts/Montserrat-Medium.ttf'),
    "600": require('../assets/fonts/Montserrat-SemiBold.ttf'),
    "700": require('../assets/fonts/Montserrat-Bold.ttf'),
    "800": require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    "900": require('../assets/fonts/Montserrat-Black.ttf'),
    ...FontAwesome.font,
  });

  console.log('Pathname', usePathname())


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name='authorization' options={{ headerShown: false }} />
            <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}
