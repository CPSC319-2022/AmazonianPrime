import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Listing } from '../../types/listing';
import { ShoppingCartItem } from '../../types/shoppingCartItem';
import { ShoppingCartItems } from '../../types/shoppingCartItems';
import { User } from '../../types/user';

export const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['CartItems'],
  endpoints: (builder) => ({
    shoppingCart: builder.query<ShoppingCartItems, string>({
      query: (userId: string) => `user/shopping-cart/${userId}`,
      providesTags: ['CartItems'],
    }),
    addListingToCart: builder.mutation<
      ShoppingCartItem,
      { listing: Listing; userId: string; body: { ListingID: number; Quantity: number } }
    >({
      query({ userId, body }) {
        return {
          url: `user/shopping-cart/${userId}`,
          credentials: 'include',
          method: 'PUT',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['CartItems'],
      async onQueryStarted({ listing, userId, body }, { dispatch, queryFulfilled }) {
        const patchResultListings = dispatch(
          shoppingCartApi.util.updateQueryData('shoppingCart', userId, (draft) => {
            const { Images, ...rest } = listing;
            draft.TotalQuantity = draft.TotalQuantity + body.Quantity;
            draft.Items.push({
              UserID: Number(userId),
              ListingID: body.ListingID,
              Listing: {
                ...rest,
                ImagePreview: Images[0],
              },
              Quantity: body.Quantity,
            });
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultListings.undo();
        }
      },
    }),
    removeListingFromCart: builder.mutation<
      any,
      { quantityRemoved: number; userId: string; body: { ListingID: number } }
    >({
      query({ userId, body }) {
        return {
          url: `user/shopping-cart/${userId}?listingId=${body.ListingID}`,
          credentials: 'include',
          method: 'DELETE',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['CartItems'],
      async onQueryStarted({ userId, body, quantityRemoved }, { dispatch, queryFulfilled }) {
        const patchResultListings = dispatch(
          shoppingCartApi.util.updateQueryData('shoppingCart', userId, (draft) => {
            draft.TotalQuantity = draft.TotalQuantity - quantityRemoved;
            draft.Items = draft.Items.filter((cartItem) => cartItem.ListingID !== body.ListingID);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultListings.undo();
        }
      },
    }),
  }),
});

export const { useAddListingToCartMutation, useShoppingCartQuery, useRemoveListingFromCartMutation } = shoppingCartApi;
