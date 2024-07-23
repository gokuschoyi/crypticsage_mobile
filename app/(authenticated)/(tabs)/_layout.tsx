import {
    Entypo
    , FontAwesome
    , AntDesign
    , MaterialIcons
    , MaterialCommunityIcons
} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '@/components/global/CustomHeader';

const Layout = () => {
    const { isDark, colors } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#000' : '#fff' }}>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.primary.main,
                    tabBarActiveBackgroundColor: colors.background.default,
                    tabBarInactiveBackgroundColor: colors.background.default,
                }}
            >
                <Tabs.Screen
                    name="stats"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ size, color }) => (
                            <FontAwesome name="home" size={size} color={color} />
                        ),
                        header: () => <CustomHeader />
                    }}
                />
                <Tabs.Screen
                    name="(allSections)"
                    options={{
                        title: 'Sections',
                        tabBarIcon: ({ size, color }) => (
                            <Entypo name="book" size={size} color={color} />
                        ),
                        header: () => <CustomHeader />
                    }} />
                <Tabs.Screen
                    name="journal"
                    options={{
                        title: 'Journal',
                        tabBarIcon: ({ size, color }) => (
                            <AntDesign name="book" size={size} color={color} />
                        ),
                        header: () => <CustomHeader />
                    }} />
                <Tabs.Screen
                    name="(tickers)"
                    options={{
                        title: 'Indicator',
                        tabBarIcon: ({ size, color }) => (
                            <MaterialIcons name="candlestick-chart" size={size} color={color} />
                        ),
                        header: () => <CustomHeader />
                    }} />
                <Tabs.Screen
                    name="(quizzes)"
                    options={{
                        title: 'Quiz',
                        tabBarIcon: ({ size, color }) => (
                            <FontAwesome name="question" size={size} color={color} />
                        ),
                        header: () => <CustomHeader />
                    }} />
                <Tabs.Screen
                    name="glossary"
                    options={{
                        title: 'Glossary',
                        tabBarIcon: ({ size, color }) => (
                            <MaterialCommunityIcons name="format-list-bulleted-square" size={size} color={color} />
                        ),
                        header: () => <CustomHeader />
                    }} />
                <Tabs.Screen
                    name="schedule"
                    options={{
                        title: 'Schedule',
                        tabBarIcon: ({ size, color }) => (
                            <MaterialIcons name="schedule" size={size} color={color} />
                        ),
                        header: () => <CustomHeader />
                    }} />
            </Tabs>
        </SafeAreaView>
    );
};
export default Layout;