import { createSlice } from '@reduxjs/toolkit';
import { Payment } from '../../types/payment';

export interface AppState {
  failMessage: string | null;
  successMessage: string | null;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: AppState, action: Action) => void;
}

export const App = createSlice<AppState, SliceReducers, 'AppSlice'>({
  name: 'AppSlice',
  initialState: {
    failMessage: null,
    successMessage: null,
  },
  reducers: {
    setFailMessage: (state: AppState, action: Action) => {
      state.failMessage = action.payload;
    },
    setSuccessMessage: (state: AppState, action: Action) => {
      state.successMessage = action.payload;
    },
  },
});

export const { setFailMessage, setSuccessMessage } = App.actions;

export default App.reducer;
