import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMenuVisible: boolean;
  scrollPosition: number;
}

const initialState: UiState = {
  isMenuVisible: false,
  scrollPosition: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    MenuHandler(state) {
      state.isMenuVisible = !state.isMenuVisible;
    },
    scrollPositionHandler(state, action: PayloadAction<number>) {
      state.scrollPosition = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
