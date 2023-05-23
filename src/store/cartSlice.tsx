import { createSlice } from '@reduxjs/toolkit';
import { CartProductType } from '../types/types';

interface CartState {
  items: CartProductType[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    onAddItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (!existingItem) {
        state.items.push(newItem);
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.price += newItem.price * newItem.quantity;
      }
      // eslint-disable-next-line no-param-reassign
      state.totalQuantity += newItem.quantity;
    },
  },
});

export const cartItemAction = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
