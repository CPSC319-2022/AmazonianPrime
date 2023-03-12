import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Listing } from '../../types/listing';
import { PaginatedListingPreviews } from '../../types/paginatedListingPreviews';

const LIMIT = 12;
export const listingsApi = createApi({
  reducerPath: 'listingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['Listings'],
  endpoints: (builder) => ({
    getRecentListings: builder.query<PaginatedListingPreviews[], void>({
      // TODO implement this in BE
      query: () => 'listing?limit=10&offset=1',
    }),
    getListings: builder.query<PaginatedListingPreviews[], any>({
      query: ({ page, category, name }) => {
        return `listing?${category !== 'all-categories' ? `category="${category}"&` : ''}${
          name && `name="${name}"&`
        }limit=${LIMIT}&offset=${LIMIT * (page - 1)}`;
      },
      providesTags: ['Listings'],
    }),
    getListingById: builder.query<Listing, string>({
      query: (listingId: string) => `listing/${listingId}`,
    }),
    createListing: builder.mutation<Listing, Partial<Listing>>({
      query(body) {
        return {
          url: `listing`,
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Listings'],
    }),
  }),
});

export const { useGetRecentListingsQuery, useGetListingByIdQuery, useCreateListingMutation, useGetListingsQuery } =
  listingsApi;
