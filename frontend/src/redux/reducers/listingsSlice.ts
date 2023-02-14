import { createSlice } from '@reduxjs/toolkit';
import { Listing } from '../../types/listing';
import { ListingPreview } from '../../types/listingPreview';

export interface ListingsState {
  recentListings: ListingPreview[] | [];
  searchResults: ListingPreview[] | [];
  listingDetails: Listing | null;
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
    listingDetails: null,
  },
  reducers: {
    setRecentListings: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        state.recentListings = action.payload as ListingPreview[];
      }
    },
    setListingDetails: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        state.listingDetails = action.payload as Listing;
      }
    },
  },
});

export const { setRecentListings, setListingDetails } = listings.actions;

export default listings.reducer;
