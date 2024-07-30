import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { markAsRead, removeNotification } from '@/reduxSlice/notificationsSlice'
import { NotificationItemProps } from '@/components/notifications/types'
import NotificationItem from '@/components/notifications/NotificationItem'
import NotificationToggle from '@/components/notifications/NotificationToggle'

const notifications = () => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const notificationsRedux = useSelector((state: any) => state.notification.notifications);
    const [toggleReadMessages, setToggleReadMessages] = useState('unread');
    const [notifications, setNotifications] = useState<NotificationItemProps[]>([]);
    const [loading, setLoading] = useState(true);

    const [anyNewNotifications, setAnyNewNotifications] = useState(0);

    //Sorting notifications by created_at latest first
    useEffect(() => {
        const notification_copy = [...notificationsRedux];
        const sortedNotifications = notification_copy.sort((a: any, b: any) => b.created_at - a.created_at);
        setNotifications(sortedNotifications);
        setLoading(false);

        //Check for new notifications
        const newNotifications = notification_copy.filter((notification: any) => !notification.seen).length;
        setAnyNewNotifications(newNotifications);
    }, [notificationsRedux]);

    // Memoized handler for deleting a notification
    const handleDelete = useCallback((toast_id: string) => {
        dispatch(removeNotification(toast_id));
    }, []);

    // Memoized handler for marking a notification as read
    const handleMarkNotificationAsRead = useCallback((toast_id: string) => {
        dispatch(markAsRead(toast_id));
    }, []);

    const handleReadMessages = (type: string) => {
        setToggleReadMessages(type);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ backgroundColor: colors.background.default, ...styles.container }}>
                <NotificationToggle unreadCount={anyNewNotifications} handleReadMessages={handleReadMessages} />

                {notifications.length > 0 &&
                    (<FlatList
                        contentContainerStyle={{ alignItems: 'center' }}
                        data={notifications}
                        keyExtractor={(item) => item.toast_id}
                        renderItem={({ item }) => (
                            <NotificationItem
                                item={item}
                                onDelete={handleDelete}
                                onMarkAsRead={handleMarkNotificationAsRead}
                                toggleReadMessages={toggleReadMessages}
                            />
                        )}
                    />)
                }
                {!loading && notifications.length === 0 && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400' }}>No Notifications</Text>
                    </View>)
                }
                {anyNewNotifications === 0 && notifications.length > 0 && toggleReadMessages === 'unread' && (
                    <View style={{ flex: 1, position: 'absolute', left: "29%", top: "60%" }}>
                        <Text style={{ color: colors.text.primary, fontSize: 20, fontFamily: '400' }}>No new notifications</Text>
                    </View>
                )}
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 110,
    }
});

export default notifications;
