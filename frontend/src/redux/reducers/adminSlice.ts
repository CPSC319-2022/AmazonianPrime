import { createSlice } from '@reduxjs/toolkit';
import { PaginatedUsers } from '../../types/paginatedUsers';

export interface AdminState {
  users: PaginatedUsers | null;
  isLoadingUsers: boolean;
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
    isLoadingUsers: false,
  },
  reducers: {
    setUsers: (state: AdminState, action: Action) => {
      if (action?.payload) {
        state.users = action.payload as PaginatedUsers;
      }
    },
    setIsLoadingUsers: (state: AdminState, action: Action) => {
      if (action?.payload) {
        state.isLoadingUsers = action.payload.isLoadingUsers;
      }
    },
  },
});

export const { setUsers, setIsLoadingUsers } = adminInfo.actions;

export default adminInfo.reducer;
