import { createSlice } from '@reduxjs/toolkit';
import { PaginatedOrders } from '../../types/paginatedOrders';

export interface OrdersState {
  orders: PaginatedOrders | null;
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
    setOrders: (state: OrdersState, action: Action) => {
      if (action?.payload) {
        state.orders = action.payload as PaginatedOrders;
      }
    },
    setIsLoadingOrders: (state: OrdersState, action: Action) => {
      if (action?.payload) {
        state.isLoading = action.payload?.isLoading;
      }
    },
  },
});

export const { setOrders, setIsLoadingOrders } = ordersInfo.actions;

export default ordersInfo.reducer;
