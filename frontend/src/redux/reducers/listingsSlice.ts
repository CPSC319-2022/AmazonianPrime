import { createSlice } from '@reduxjs/toolkit';
import { Listing } from '../../types/listing';
import { ListingPreview } from '../../types/listingPreview';
import { PaginatedListingPreviews } from '../../types/paginatedListingPreviews';

export interface ListingsState {
  // Landing page previews
  recentListings: PaginatedListingPreviews | null;
  amazonExlusives: PaginatedListingPreviews | null;

  listings: PaginatedListingPreviews | null;
  listingDetails: Listing | null;
  isLoadingListings: boolean;
  isLoadingListingDetails: boolean;
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
    recentListings: null,
    amazonExlusives: null,
    listings: null,
    listingDetails: null,
    isLoadingListingDetails: false,
    isLoadingListings: false,
  },
  reducers: {
    setListings: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        state.listings = action.payload as PaginatedListingPreviews;
      }
    },
    setIsLoadingListings: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        state.isLoadingListings = action.payload.isLoadingListings;
      }
    },
    setIsLoadingListingDetails: (state: ListingsState, action: Action) => {
      state.isLoadingListingDetails = action.payload;
    },
    setRecentListings: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        state.recentListings = action.payload as PaginatedListingPreviews;
      }
    },
    setAmazonExclusives: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        state.amazonExlusives = action.payload as PaginatedListingPreviews;
      }
    },
    setPartialListingDetails: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        const listingPreview = action.payload as ListingPreview;
        const { ImagePreview, ...rest } = listingPreview;
        const listing: Listing = {
          ...rest,
          Images: [ImagePreview],
        };
        state.listingDetails = listing as Listing;
      }
    },
    setListingDetails: (state: ListingsState, action: Action) => {
      if (action?.payload) {
        state.listingDetails = action.payload as Listing;
      }
    },
    unsetListingDetails: (state: ListingsState, action: Action) => {
      state.listingDetails = null;
    },
  },
});

export const {
  setRecentListings,
  setPartialListingDetails,
  setListingDetails,
  setListings,
  setIsLoadingListingDetails,
  setIsLoadingListings,
  unsetListingDetails,
  setAmazonExclusives,
} = listings.actions;

export default listings.reducer;
