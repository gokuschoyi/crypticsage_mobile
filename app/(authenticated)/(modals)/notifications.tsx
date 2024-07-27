import React from 'react';
import { View, Text, FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@/theme';

const notifications = () => {
    const { colors } = useTheme();
    const notifications = useSelector((state: any) => state.notification.notifications);
    console.log(notifications)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default, paddingTop: 80 }}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.toast_id}
                renderItem={({ item }) => (
                    <View style={styles.notification}>
                        <Text style={{ fontSize: 12, fontFamily: '300', color: colors.text.primary }}>{item.toast_data.text2}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    notification: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default notifications;
