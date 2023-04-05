import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Listing } from '../../types/listing';
import { PaginatedListingPreviews } from '../../types/paginatedListingPreviews';
import moment from 'moment';

const LIMIT = 12;
export const listingsApi = createApi({
  reducerPath: 'listingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['Listings', 'UserListings', 'ListingDetails'],
  endpoints: (builder) => ({
    getRecentListings: builder.query<PaginatedListingPreviews, void>({
      query: () => {
        // return listings posted 14 days ago
        return `listing?startDate="${moment(new Date()).subtract(14, 'd').format('YYYY-MM-DD')}"&limit=20&offset=0`;
      },
    }),
    getListings: builder.query<PaginatedListingPreviews, { page: number; category: string; name: string }>({
      query: ({ page, category, name }) => {
        return `listing?${category !== 'all-categories' ? `category=\"${category}\"&` : ''}${
          name && `name="${name}"&`
        }limit=${LIMIT}&offset=${LIMIT * (page - 1)}`;
      },
      providesTags: ['Listings'],
    }),
    deleteListing: builder.mutation<any, { ListingID: number; UserID: string }>({
      query({ ListingID, UserID }) {
        return {
          url: `listing/delete/${ListingID}`,
          credentials: 'include',
          method: 'DELETE',
          body: {
            UserID,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      async onQueryStarted({ ListingID, ...patch }, { dispatch, queryFulfilled }) {
        const patchResultListings = dispatch(
          listingsApi.util.updateQueryData('getListingsByUserId', { page: 1, listingUserId: patch.UserID }, (draft) => {
            draft.Data = draft.Data.filter((listingPreview) => listingPreview.ListingID !== ListingID);
            draft.TotalListings = (Number(draft.TotalListings) - 1).toString();
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultListings.undo();
        }
      },
      invalidatesTags: ['UserListings', 'Listings'],
    }),
    getListingsByUserId: builder.query<PaginatedListingPreviews, { page: number; listingUserId: string }>({
      query: ({ page, listingUserId }) => {
        return `listing?${`listingUserId=\"${listingUserId}\"`}&limit=${LIMIT}&offset=${LIMIT * (page - 1)}`;
      },
      providesTags: ['UserListings'],
    }),
    getListingById: builder.query<Listing, string>({
      query: (listingId: string) => `listing/${listingId}`,
      providesTags: ['ListingDetails'],
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
  useLazyGetListingByIdQuery,
  useGetListingsByUserIdQuery,
  useDeleteListingMutation,
} = listingsApi;
