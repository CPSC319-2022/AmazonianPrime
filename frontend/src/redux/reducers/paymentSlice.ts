import { createSlice } from '@reduxjs/toolkit';
import { Payment } from '../../types/payment';

export interface PaymentState {
  value: Payment | null;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: PaymentState, action: Action) => void;
}

export const payment = createSlice<PaymentState, SliceReducers, 'paymentSlice'>({
  name: 'paymentSlice',
  initialState: {
    value: null
  },
  reducers: {
    setPayment: (state: PaymentState, action: Action) => {
      if (action?.payload) {
        // This is temp work. IRL we should find a way to stay signed in after refresh
        state.value = action.payload as Payment;
      }
    },
  },
});

export const { setPayment } = payment.actions;

export default payment.reducer;
