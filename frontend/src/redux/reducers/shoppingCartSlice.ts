import { createSlice } from '@reduxjs/toolkit';
import { ShoppingCartItems } from '../../types/shoppingCartItems';

export interface CartState {
  items: ShoppingCartItems | null;
  isLoading: boolean;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: CartState, action: Action) => void;
}

export const cart = createSlice<CartState, SliceReducers, 'cartSlice'>({
  name: 'cartSlice',
  initialState: {
    items: null,
    isLoading: false,
  },
  reducers: {
    addItemToCart: (state: CartState, action: Action) => {
      if (action?.payload) {
        // state.items = [...state.items, action.payload];
      }
    },
    setIsLoadingCart: (state: CartState, action: Action) => {
      if (action?.payload) {
        state.isLoading = action.payload?.isLoading;
      }
    },
    addItemsToCart: (state: CartState, action: Action) => {
      if (action?.payload) {
        state.items = action.payload;
      }
    },
  },
});

export const { addItemToCart, addItemsToCart, setIsLoadingCart } = cart.actions;

export default cart.reducer;
