import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
// import { saveState } from './storage';
import cartSlice, { CART_PERSISTENT_STATE } from './cart.slice';
import orderHistoryReducer from "./orderHistorySlice.reducer.ts";
import storage from 'redux-persist/lib/storage'; // Исправлено на 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'; // Изменено на 'redux-persist'


const rootReducer = combineReducers({
	user: userSlice,
	cart: cartSlice,
	orderHistory: orderHistoryReducer
});

const persistConfig = {
	key: 'root',
	storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST'],
				ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
				ignoredPaths: ['items.dates'],
			},
		}),
});

// store.subscribe(() => {
// 	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
// 	saveState(store.getState().cart, CART_PERSISTENT_STATE);
// });

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

