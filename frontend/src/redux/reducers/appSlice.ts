import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  failMessage: string | null;
  successMessage: string | null;
  queueMessage: string | null;
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
    queueMessage: null,
  },
  reducers: {
    setFailMessage: (state: AppState, action: Action) => {
      state.queueMessage = null;
      state.failMessage = action.payload;
    },
    setSuccessMessage: (state: AppState, action: Action) => {
      state.queueMessage = null;
      state.successMessage = action.payload;
    },
    setQueueMessage: (state: AppState, action: Action) => {
      state.queueMessage = action.payload;
    },
  },
});

export const { setFailMessage, setSuccessMessage, setQueueMessage } = App.actions;

export default App.reducer;
