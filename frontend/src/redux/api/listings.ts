import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Listing } from '../../types/listing';

export const listingsApi = createApi({
  reducerPath: 'listingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `api` }),
  endpoints: (builder) => ({
    getRecentListings: builder.query<Listing[], void>({
      // TODO implement this in BE
      query: () => 'listings?posted=021123',
    }),
  }),
});

export const { useGetRecentListingsQuery } = listingsApi;
