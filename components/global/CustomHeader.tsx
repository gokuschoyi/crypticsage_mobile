import * as Haptics from 'expo-haptics';
import { TextInput, Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

const CustomHeader = () => {
    const { colors, isDark } = useTheme();
    const notification_count = useSelector((state: any) => state.notification.notificationCount)
    const user_name = useSelector((state: any) => state.auth.displayName)

    return (
        <LinearGradient
            colors={[colors.primary.newBlack, colors.background.nav]}>
            <View
                style={[
                    styles.container,
                    {
                        height: 75,
                        paddingHorizontal: 20,

                    },
                ]}>
                <Link href={'/(authenticated)/(modals)/account'} asChild>
                    <Pressable
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                            backgroundColor: colors.background.paperOne,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
                        <Text style={{ color: colors.primary.main, fontWeight: '500', fontSize: 28 }}>{user_name.slice(0, 1).toUpperCase()}</Text>
                    </Pressable>
                </Link>

                {/* <View style={{ ...styles.searchSection, backgroundColor: colors.background.paperOne }}>
                    <Ionicons style={styles.searchIcon} name="search" size={20} color={colors.primary.main} />
                    <TextInput
                        style={{
                            ...styles.input
                            , color: colors.primary.main
                            , backgroundColor: colors.background.paperOne
                        }}
                        placeholder="Search"
                        placeholderTextColor={colors.primary.main}
                    />
                </View> */}

                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                    <Link href={'/(authenticated)/(modals)/notifications'} asChild>
                        <Pressable
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 30,
                                backgroundColor: colors.background.paperOne,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
                            {(notification_count > 0 && notification_count < 99) ? (
                                <View style={{ position: 'absolute', transform: [{ translateX: 10 }, { translateY: -10 }], zIndex: 10 }}>
                                    <Text style={{ color: colors.primary.newWhite, fontWeight: '500', fontSize: 10 }}>{notification_count}</Text>
                                </View>
                            ) : (
                                <>
                                    <View style={{ position: 'absolute', transform: [{ translateX: 10 }, { translateY: -10 }], zIndex: 10 }}>
                                        <Text style={{ color: colors.primary.newWhite, fontWeight: '500', fontSize: 10 }}>99</Text>
                                    </View>
                                    <View style={{ position: 'absolute', transform: [{ translateX: 18 }, { translateY: -12 }] }}>
                                        <Text style={{ color: colors.primary.newWhite, fontWeight: '500', fontSize: 10 }}>+</Text>
                                    </View>
                                </>
                            )}
                            <Ionicons name={'notifications-outline'} size={28} color={colors.primary.main} />
                        </Pressable>
                    </Link>

                    <View style={{ ...styles.circle, backgroundColor: colors.background.paperOne }}>
                        <Pressable
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 30,
                                backgroundColor: colors.background.paperOne,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
                            <Ionicons name={'settings-outline'} size={28} color={colors.primary.main} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        height: 42,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        borderRadius: 30,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomHeader;