// @ts-nocheck
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

import authSlice from './reduxSlice/authSlice';

const reducer = combineReducers({
    auth: authSlice
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    serialize: true,
    version: 1,  // Update this number anytime changes are made to any of the redux slices. This will trigger the migration function below
    stateReconciler: autoMergeLevel2,
    migrate: (state: { _persist: { version: any; }; }, currentVersion: any) => {
        if (state && state._persist.version !== currentVersion) {
            console.log(`New state version ${currentVersion}. Clearing state`); // If the versions don't match, clear the state
            return Promise.resolve(undefined); // This clears the old state
        } else {
            console.log(`State version ${currentVersion}. No migration needed`)
            return Promise.resolve(state); // Otherwise, return the state as is
        }
    }
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

const persistor = persistStore(store);

export { persistor };

export default store;