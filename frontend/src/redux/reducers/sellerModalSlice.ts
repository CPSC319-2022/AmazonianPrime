import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SellerModalState {
  isSellerModalOpen: boolean;
  isSellerInfoApplied: boolean;
  isCreateListingModalOpen: boolean;
}

const initialState: SellerModalState = {
  isSellerModalOpen: false,
  isSellerInfoApplied: false,
  isCreateListingModalOpen: false,
};

export const sellerModalSlice = createSlice({
  name: 'sellerModal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isSellerModalOpen = action.payload;
    },
    toggleSellerInfoApplied: (state, action: PayloadAction<boolean>) => {
      state.isSellerInfoApplied = action.payload;
    },
    toggleCreateListingModal: (state, action: PayloadAction<boolean>) => {
      state.isCreateListingModalOpen = action.payload;
    },
  },
});

export const { toggleModal, toggleSellerInfoApplied, toggleCreateListingModal } = sellerModalSlice.actions;
export default sellerModalSlice.reducer;
