import { createSlice } from '@reduxjs/toolkit';
import { Address } from '../../types/address';

export interface AddressState {
  value: Address | null;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: AddressState, action: Action) => void;
}

export const address = createSlice<AddressState, SliceReducers, 'shippingAddressSlice'>({
  name: 'shippingAddressSlice',
  initialState: {
    value: null,
  },
  reducers: {
    setShippingAddress: (state: AddressState, action: Action) => {
      if (action?.payload) {
        state.value = action.payload as Address;
      }
    },
  },
});

export const { setShippingAddress } = address.actions;

export default address.reducer;
