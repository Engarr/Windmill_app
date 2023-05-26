import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui-slice';
// import { productsApi } from './api/apiSlice';
import apiSlice from './api/apiSlice';
// import cartItemsReducer from './cartSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ui: uiReducer,
    // cartItems: cartItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
