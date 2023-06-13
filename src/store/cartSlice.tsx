import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  items: {
    productId: string;
    quantity: number;
  }[];
  totalQuantity: number;
}
const localStorageItems: CartState = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') as string)
  : {
      items: [],
      totalQuantity: 0,
    };
const initialState: CartState = {
  items: localStorageItems.items,
  totalQuantity: localStorageItems.totalQuantity,
};

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    onAddItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );
      if (!existingItem) {
        state.items.push(newItem);
      } else {
        existingItem.quantity += newItem.quantity;
      }

      state.totalQuantity += newItem.quantity;
    },
    onIncreaseQty: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === itemId
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
      }
    },
    onDecreaseQty: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === itemId
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item !== existingItem);
        state.totalQuantity -= existingItem.quantity;
      }
    },
    onRemoveProduct: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === itemId
      );
      if (existingItem) {
        state.items = state.items.filter((item) => item !== existingItem);
        state.totalQuantity -= existingItem.quantity;
      }
    },
    onClearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const cartItemAction = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
