import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root', // key to store data in localStorage
    storage, // using localStorage for persistence
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedReducer // Add more reducers as needed
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
        }
    })
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export {store, persistor};