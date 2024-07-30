import Toast from 'react-native-toast-message';
import * as Crypto from 'expo-crypto';

import { useDispatch } from 'react-redux';
import { addNotification } from '@/reduxSlice/notificationsSlice'

interface ToastParams {
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
}

const getItemHeight = (text2: string) => {
    const singleLineLength = 63
    let itemHeight = 60 // default height
    const text2Length = text2.length
    // console.log('text2Length', text2Length)
    if (text2Length <= singleLineLength) { // 1 line
        itemHeight = 60
    } else if (text2Length > singleLineLength && text2Length <= 2 * singleLineLength) { // 2 lines
        itemHeight = 65
    } else if (text2Length > 2 * singleLineLength && text2Length <= 3 * singleLineLength) { // 3 lines
        itemHeight = 80
    } else if (text2Length > 3 * singleLineLength && text2Length <= 4 * singleLineLength) { // 4 lines
        itemHeight = 95
    } else if (text2Length > 4 * singleLineLength) { // 5 lines
        itemHeight = 110
    } else if (text2Length > 5 * singleLineLength) { // 6 lines
        itemHeight = 125
    } else {
        itemHeight = 130
    }
    return itemHeight
}

const NotificationsHandler = () => {
    const dispatch = useDispatch()

    const showNotification = (toast_params: ToastParams) => {
        Toast.show(toast_params)

        let itemHeight = 0
        if (toast_params.type === 'customWarn') {
            itemHeight = getItemHeight((toast_params.props.test_possible ?? '') + (toast_params.props.train_possible ?? '')) + 30
        } else if (toast_params.type === 'customError') {
            itemHeight = getItemHeight(toast_params.props.func_error ?? '') + 15
        } else {
            itemHeight = getItemHeight(toast_params.text2)
        }

        const notification = {
            toast_id: Crypto.randomUUID(),
            created_at: new Date().getTime(),
            toast_data: { ...toast_params, height: itemHeight },
            seen: false
        }

        dispatch(addNotification(notification))
    }

    return { showNotification }
}

export default NotificationsHandler