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

export const address = createSlice<AddressState, SliceReducers, 'addressSlice'>({
  name: 'addressSlice',
  initialState: {
    value: null
  },
  reducers: {
    setAddress: (state: AddressState, action: Action) => {
      if (action?.payload) {
        // This is temp work. IRL we should find a way to stay signed in after refresh
        state.value = action.payload as Address;
      }
    },
  },
});

export const { setPayment } = address.actions;

export default address.reducer;
