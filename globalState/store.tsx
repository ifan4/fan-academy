'use client'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeReducer from "./themeReducer";
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, Persistor, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
    timeout: 500,
    key: 'root',
    storage
 };
 const rootReducer = combineReducers({
    theme: themeReducer,
 });
 
 const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

// store.subscribe(()=>{
//     localStorage.setItem('theme', store.getState().theme.name)
    
// })


export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch:()=> typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;

export const persistor = persistStore(store);
