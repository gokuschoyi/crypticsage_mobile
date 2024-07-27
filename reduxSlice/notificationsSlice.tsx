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
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
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
    , removeNotification
    , clearNotifications
} = actions

export default reducer