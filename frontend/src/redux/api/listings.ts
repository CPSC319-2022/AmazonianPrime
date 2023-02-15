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
    getListingById: builder.query<Listing, string>({
      // TODO implement this in BE
      query: (listingId: string) => `listing/${listingId}`,
    }),
  }),
});

export const { useGetRecentListingsQuery, useGetListingByIdQuery } = listingsApi;
