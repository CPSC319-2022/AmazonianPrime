import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Listing } from '../../types/listing';
import { ListingPreview } from '../../types/listingPreview';

export const listingsApi = createApi({
  reducerPath: 'listingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  endpoints: (builder) => ({
    getRecentListings: builder.query<ListingPreview[], void>({
      // TODO implement this in BE
      query: () => 'listings?posted=021123',
    }),
    // TODO new api??
<<<<<<< HEAD
    getListingById: builder.query<Listing, void>({
      // TODO implement this in BE
      query: () => 'listing/da95cf19-91de-4eca-8a95-18eb4ce42bce',
=======
    getListingById: builder.query<Listing, string>({
      // TODO implement this in BE
      query: (listingId: string) => `listing/${listingId}`,
>>>>>>> main
    }),
  }),
});

export const { useGetRecentListingsQuery, useGetListingByIdQuery } = listingsApi;
