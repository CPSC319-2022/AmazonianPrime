import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  failMessage: string | null;
  successMessage: string | null;
  queueMessage: string | null;
  arn: string | null;
  taskToken: string | null;
  expiryDate: string | null;
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
    arn: sessionStorage.getItem('arn'),
    taskToken: sessionStorage.getItem('taskToken'),
    expiryDate: sessionStorage.getItem('expiryDate'),
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
    setCartLock: (state: AppState, action: Action) => {
      const { arn, taskToken, expiryDate } = action.payload;
      state.arn = arn;
      state.taskToken = taskToken;
      state.expiryDate = expiryDate;
      sessionStorage.setItem('arn', arn);
      sessionStorage.setItem('taskToken', taskToken);
      sessionStorage.setItem('cartExpiryTime', expiryDate);
    },
    unsetCartLock: (state: AppState) => {
      state.arn = null;
      state.taskToken = null;
      state.expiryDate = null;
      sessionStorage.removeItem('arn');
      sessionStorage.removeItem('taskToken');
      sessionStorage.removeItem('cartExpiryTime');
    },
  },
});

export const { setFailMessage, setSuccessMessage, setQueueMessage, setCartLock, unsetCartLock } = App.actions;

export default App.reducer;
