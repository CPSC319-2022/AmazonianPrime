import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from '../reducers/userSlice';
import listingsReducer from '../reducers/listingsSlice';
import cartReducer from '../reducers/shoppingCartSlice';
import sellerModalReducer from '../reducers/sellerModalSlice';
import appReducer from '../reducers/appSlice';
import ordersReducer from '../reducers/ordersSlice';
import { userApi } from '../api/user';
import { listingsApi } from '../api/listings';
import { shoppingCartApi } from '../api/shoppingCart';
import { ordersApi } from '../api/orders';

const store = configureStore({
  reducer: {
    // user
    user: userReducer,
    cart: cartReducer,
    app: appReducer,
    orders: ordersReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    sellerModal: sellerModalReducer,
    [userApi.reducerPath]: userApi.reducer,
    // listings
    listings: listingsReducer,
    [listingsApi.reducerPath]: listingsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, listingsApi.middleware, shoppingCartApi.middleware, ordersApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Use instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
