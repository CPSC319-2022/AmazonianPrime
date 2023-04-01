import { createSlice } from '@reduxjs/toolkit';
import { OrderItems } from '../../types/OrderItems';

export interface OrdersState {
  orders: OrderItems | null;
  isLoading: boolean;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: OrdersState, action: Action) => void;
}

export const ordersInfo = createSlice<OrdersState, SliceReducers, 'ordersSlice'>({
  name: 'ordersSlice',
  initialState: {
    orders: null,
    isLoading: false,
  },
  reducers: {
    addItemToOrders: (state: OrdersState, action: Action) => {
      if (action?.payload) {
        // state.orders = [...state.orders, action.payload];
      }
    },
    setIsLoadingOrders: (state: OrdersState, action: Action) => {
      if (action?.payload) {
        state.isLoading = action.payload?.isLoading;
      }
    },
    addItemsToOrders: (state: OrdersState, action: Action) => {
      if (action?.payload) {
        state.orders = action.payload;
      }
    },
  },
});

export const { addItemOrders, setIsLoadingOrders, addItemsToOrders } = ordersInfo.actions;

export default ordersInfo.reducer;
