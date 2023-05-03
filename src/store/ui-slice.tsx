import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMenuVisible: boolean;
  scrollPosition: number;
  isCategoryMenu: boolean;
}

const initialState: UiState = {
  isMenuVisible: false,
  scrollPosition: 0,
  isCategoryMenu: false,
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
    CategoryMenuHandler(state) {
      state.isCategoryMenu = !state.isCategoryMenu;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
