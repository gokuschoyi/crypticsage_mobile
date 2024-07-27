import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect } from 'react';
import { ThemeProvider } from '../theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, ActivityIndicator } from 'react-native';
import toastConfig from '@/components/notifications/customToastConfig';
import ModalBackButton from '@/components/global/ModalBackButton';
import Toast from 'react-native-toast-message';
import store, { persistor } from '../store';

import { useProtectedRoute } from '@/hooks/auth.guard';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

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

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // if (!loaded) {
  //   return <Slot />;
  // }

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color='red' />
      </View>
    );
  }

  return (<RootLayoutNav />);
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider >
  );
}

function App() {
  const router = useRouter();
  useProtectedRoute();
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(authenticated)/(modals)/account"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <ModalBackButton />
          ),
        }}
      />
      <Stack.Screen
        name="(authenticated)/(modals)/notifications"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <ModalBackButton />
          ),
        }}
      />
    </Stack>
  )
}
