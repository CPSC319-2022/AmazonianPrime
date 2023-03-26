import { createSlice } from '@reduxjs/toolkit';
import { Address } from '../../types/address';
import { Payment } from '../../types/payment';
import { User } from '../../types/user';

export interface UserState {
  value: User | null;
  paymentMethod: Payment | null;
  shippingAddress: Address | null;
  paymentAddress: Address | null;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: UserState, action: Action) => void;
}

export const user = createSlice<UserState, SliceReducers, 'userSlice'>({
  name: 'userSlice',
  initialState: {
    value: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '') : undefined,
    paymentMethod: null,
    shippingAddress: null,
    paymentAddress: null,
  },
  reducers: {
    setUser: (state: UserState, action: Action) => {
      if (action?.payload) {
        // This is temp work. IRL we should find a way to stay signed in after refresh
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        state.value = action.payload as User;
      } else {
        sessionStorage.removeItem('user');
        state.value = null;
      }
    },
    setPayment: (state: UserState, action: Action) => {
      if (action?.payload) {
        state.paymentMethod = action.payload as Payment;
      }
    },
    setPaymentAddress: (state: UserState, action: Action) => {
      if (action?.payload) {
        state.paymentAddress = action.payload as Address;
      }
    },
    setShippingAddress: (state: UserState, action: Action) => {
      if (action?.payload) {
        state.shippingAddress = action.payload as Address;
      }
    },
  },
});

export const { setUser, setPayment, setPaymentAddress, setShippingAddress } = user.actions;

export default user.reducer;
