import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';

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
    value: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '') : undefined,
  },
  reducers: {
    setUser: (state: UserState, action: Action) => {
      if (action?.payload) {
        // This is temp work. IRL we should find a way to stay signed in after refresh
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        state.value = action.payload as User;
      }
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
