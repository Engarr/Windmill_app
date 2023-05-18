import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui-slice';
import { productsApi } from './apiSlice';
import cartItemsReducer from './cartSlice';

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    ui: uiReducer,
    cartItems: cartItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
