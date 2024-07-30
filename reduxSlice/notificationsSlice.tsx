// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    notificationCount: 0
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload)
            state.notificationCount++
        },
        markAsRead: (state, action) => {
            state.notifications = state.notifications.map(notification => {
                if (notification.toast_id === action.payload) {
                    notification.seen = true
                }
                return notification
            })
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(notification => notification.toast_id !== action.payload)
            state.notificationCount--
        },
        clearNotifications: (state) => {
            state.notifications = []
            state.notificationCount = 0
        }
    }
})

const { reducer, actions } = notificationsSlice

export const {
    addNotification
    , markAsRead
    , removeNotification
    , clearNotifications
} = actions

export default reducer