import { createSlice } from '@reduxjs/toolkit';
import { User } from 'amazonian-prime-types';

export interface UserState {
  value: User | null;
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
    value: null,
  },
  reducers: {
    setUser: (state: UserState, action: Action) => {
      if (action?.payload) {
        state.value = action.payload as User;
      }
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
