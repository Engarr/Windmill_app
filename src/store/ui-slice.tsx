import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMenuVisible: boolean;
  scrollPosition: number;
  isCategoryMenu: boolean;
  isSearchModalVisible: boolean;
}

const initialState: UiState = {
  isMenuVisible: false,
  scrollPosition: 0,
  isCategoryMenu: false,
  isSearchModalVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    MenuHandler: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isMenuVisible = !state.isMenuVisible;
    },

    scrollPositionHandler: (state, action: PayloadAction<number>) => {
      return { ...state, scrollPosition: action.payload };
    },

    CategoryMenuHandler: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isCategoryMenu = !state.isCategoryMenu;
    },
    SearchModalVisibleHandler: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isSearchModalVisible = !state.isSearchModalVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
