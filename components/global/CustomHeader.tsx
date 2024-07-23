import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { useTheme } from '@/theme';

const CustomHeader = () => {
    const { colors } = useTheme();

    return (
        <BlurView intensity={80} tint={'extraLight'}>
            <View style={{ backgroundColor: colors.background.default }}>
                <View
                    style={[
                        styles.container,
                        {
                            height: 60,
                            gap: 10,
                            paddingHorizontal: 20,
                        },
                    ]}>
                    <Link href={'/(authenticated)/(modals)/account'} asChild>
                        <TouchableOpacity
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: colors.background.paperOne,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: colors.primary.main, fontWeight: '500', fontSize: 16 }}>GC</Text>
                        </TouchableOpacity>
                    </Link>
                    <View style={{ ...styles.searchSection, backgroundColor: colors.background.paperOne }}>
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
                    </View>
                    <View style={{ ...styles.circle, backgroundColor: colors.background.paperOne }}>
                        <Ionicons name={'notifications-outline'} size={20} color={colors.primary.main} />
                    </View>
                    <View style={{ ...styles.circle, backgroundColor: colors.background.paperOne }}>
                        <Ionicons name={'settings-outline'} size={20} color={colors.primary.main} />
                    </View>
                </View>
            </View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
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