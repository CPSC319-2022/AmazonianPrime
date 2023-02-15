import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SellerModalState {
    isSellerModalOpen: boolean
}

const initialState: SellerModalState = {
    isSellerModalOpen: false
}

export const sellerModalSlice = createSlice({
    name: 'sellerModal',
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<boolean>) => {
            state.isSellerModalOpen = action.payload
        }
    }
})

export const { toggleModal } = sellerModalSlice.actions;
export default sellerModalSlice.reducer;
