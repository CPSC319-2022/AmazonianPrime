import { createSlice } from '@reduxjs/toolkit';
import { Listing } from '../../types/listing';

export interface ListingsState {
  recentListings: Listing[] | [];
  searchResults: Listing[] | [];
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: ListingsState, action: Action) => void;
}

export const listings = createSlice<ListingsState, SliceReducers, 'listingSlice'>({
  name: 'listingSlice',
  initialState: {
    recentListings: [],
    searchResults: [],
  },
  reducers: {
    setRecentListings: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        state.recentListings = action.payload as Listing[];
      }
    },
  },
});

export const { setRecentListings } = listings.actions;

export default listings.reducer;
