import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { PaginatedUsers } from '../../types/paginatedUsers';

export interface AdminState {
  users: PaginatedUsers | null;
  orders: null;

  isLoadingUsers: boolean;
  isLoadingOrders: boolean;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: AdminState, action: Action) => void;
}

export const adminInfo = createSlice<AdminState, SliceReducers, 'adminSlice'>({
  name: 'adminSlice',
  initialState: {
    users: null,
    orders: null,
    isLoadingUsers: false,
    isLoadingOrders: false,
  },
  reducers: {
    setUsers: (state: AdminState, action: Action) => {
      if (action?.payload) {
        state.users = action.payload as PaginatedUsers;
      }
    },
  },
});

export const {
  setUsers,
} = adminInfo.actions;

export default adminInfo.reducer;
