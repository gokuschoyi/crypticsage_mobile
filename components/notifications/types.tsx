export type ToastParams = {
    type: string;
    text1: string;
    text2: string;
    props: {
        bg: string;
        border: string;
        t1_color: string;
        t2_color: string;
        error_message?: string;
        test_possible?: string;
        train_possible?: string;
        message?: string;
        step?: string;
        func_error?: string;
    };
    height: number;
}

export type NotificationItemProps = {
    toast_id: string;
    toast_data: ToastParams
    seen: boolean;
    created_at: number;
}

export interface SingleNotificationItemProps {
    item: NotificationItemProps,
    onDelete: (toast_id: string) => void,
    onMarkAsRead: (toast_id: string) => void,
    toggleReadMessages: string
}