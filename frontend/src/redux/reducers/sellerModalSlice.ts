import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SellerModalState {
  isSellerModalOpen: boolean;
  isSellerRegistered: boolean;
  isCreateListingModalOpen: boolean;
}

const initialState: SellerModalState = {
  isSellerModalOpen: false,
  isSellerRegistered: false,
  isCreateListingModalOpen: false,
};

export const sellerModalSlice = createSlice({
  name: 'sellerModal',
  initialState,
  reducers: {
    modifyRegisterUserModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isSellerModalOpen = action.payload;
    },
    modifyIsSellerRegistered: (state, action: PayloadAction<boolean>) => {
      state.isSellerRegistered = action.payload;
    },
    modifyCreateListingModalVisibility: (state, action: PayloadAction<boolean>) => {
      if (state.isSellerRegistered) {
        state.isCreateListingModalOpen = action.payload;
      } else {
        state.isSellerModalOpen = action.payload;
      }
    },
  },
});

export const { modifyRegisterUserModalVisibility, modifyIsSellerRegistered, modifyCreateListingModalVisibility } =
  sellerModalSlice.actions;
export default sellerModalSlice.reducer;
