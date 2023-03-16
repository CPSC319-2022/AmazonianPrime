import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Listing } from '../../types/listing';
import { PaginatedListingPreviews } from '../../types/paginatedListingPreviews';
import moment from 'moment';

const LIMIT = 12;
export const listingsApi = createApi({
  reducerPath: 'listingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['Listings'],
  endpoints: (builder) => ({
    getRecentListings: builder.query<PaginatedListingPreviews[], void>({
      query: () => {
        // return listings posted 14 days ago
        return `listing?startDate="${moment(new Date()).subtract(14, 'd').format('YYYY-MM-DD')}"&limit=20&offset=1`;
      },
    }),
    getListings: builder.query<PaginatedListingPreviews[], { page: number; category: string; name: string }>({
      query: ({ page, category, name }) => {
        return `listing?${category !== 'all-categories' ? `category=\"${category}\"&` : ''}${
          name && `name="${name}"&`
        }limit=${LIMIT}&offset=${LIMIT * (page - 1)}`;
      },
      providesTags: ['Listings'],
    }),
    getListingsByUserId: builder.query<PaginatedListingPreviews[], { page: number; listingUserId: string }>({
      query: ({ page, listingUserId }) => {
        return `listing?${`listingUserId=\"${listingUserId}\"`}&limit=${LIMIT}&offset=${LIMIT * (page - 1)}`;
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

export const {
  useGetRecentListingsQuery,
  useGetListingByIdQuery,
  useCreateListingMutation,
  useGetListingsQuery,
  useGetListingsByUserIdQuery,
} = listingsApi;
