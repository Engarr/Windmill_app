import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isMenuVisible: boolean;
  scrollPosition: number;
  isCategoryMenu: boolean;
  isSearchModalVisible: boolean;
  deliveryMethod: number;
}

const initialState: UiState = {
  isMenuVisible: false,
  scrollPosition: 0,
  isCategoryMenu: false,
  isSearchModalVisible: false,
  deliveryMethod: 0,
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
    selectDeliveryMethod: (state, action: PayloadAction<number>) => {
      return { ...state, deliveryMethod: action.payload };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
