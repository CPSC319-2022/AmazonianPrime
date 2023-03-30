import { createSlice } from '@reduxjs/toolkit';
import { Order } from '../../types/order';

export interface OrdersState {
  orders: Order[] | null;
  isLoading: boolean;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: OrdersState, action: Action) => void;
}

export const orders = createSlice<OrdersState, SliceReducers, 'ordersSlice'>({
  name: 'ordersSlice',
  initialState: {
    orders: null,
    isLoading: false,
  },
  reducers: {
    addOrderToOrders: (state: OrdersState, action: Action) => {
      if (action?.payload) {
        // state.items = [...state.items, action.payload];
      }
    },
    setIsLoadingOrders: (state: OrdersState, action: Action) => {
      if (action?.payload) {
        state.isLoading = action.payload?.isLoading;
      }
    },
  },
});

export const {
  addOrderToOrders,
  setIsLoadingOrders
} = orders.actions;

export default orders.reducer;
