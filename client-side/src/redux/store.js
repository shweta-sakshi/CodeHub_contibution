/**
 * @fileoverview Redux store configuration.
 */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';

// Persist config for Redux.
const persistConfig = {
    key: 'root',// Key for the persisted state in local storage.
    storage,
    whitelist: ['auth'], // Only persist the auth slice
};

// Create a persisted reducer .
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store.
const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for Redux middleware.
        }),
});

// Create a persistor to persist the Redux store.
const persistor = persistStore(store);

export { store, persistor };
