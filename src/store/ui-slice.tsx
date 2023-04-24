import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMenuVisible: boolean;
}

const initialState: UiState = {
  isMenuVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    MenuHandler(state) {
      state.isMenuVisible = !state.isMenuVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
