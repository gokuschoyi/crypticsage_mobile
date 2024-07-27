import Toast from 'react-native-toast-message';
import * as Crypto from 'expo-crypto';

import { useDispatch } from 'react-redux';
import { addNotification } from '@/reduxSlice/notificationsSlice'

const NotificationsHandler = () => {
    const dispatch = useDispatch()

    const showNotification = (toast_params: object) => {
        Toast.show(toast_params)

        const notification = {
            toast_id: Crypto.randomUUID(),
            created_at: new Date().getTime(),
            toast_data: toast_params,
            seen: false
        }

        dispatch(addNotification(notification))
    }

    return { showNotification }
}

export default NotificationsHandler