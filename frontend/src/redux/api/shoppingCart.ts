import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Listing } from '../../types/listing';
import { ListingPreview } from '../../types/listingPreview';
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
    checkout: builder.mutation<any, { UserID: string; AddressID: string; PaymentID: string }>({
      query(body) {
        return {
          url: `checkout/test`,
          credentials: 'include',
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['CartItems'],
      async onQueryStarted({ UserID }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          shoppingCartApi.util.updateQueryData('shoppingCart', UserID, (draft) => {
            Object.assign(draft, []);
          }),
        );
      },
    }),
    retryCheckout: builder.mutation<
      any,
      { UserID: string; body: { TaskToken: string; ExecutionArn: string; PaymentID: string } }
    >({
      query({ body }) {
        return {
          url: `checkout/retry`,
          credentials: 'include',
          method: 'POST',
          body: {
            ...body,
            ExecutionArn: body.ExecutionArn,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['CartItems'],
      async onQueryStarted({ UserID }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          shoppingCartApi.util.updateQueryData('shoppingCart', UserID, (draft) => {
            Object.assign(draft, []);
          }),
        );
      },
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
            draft.Subtotal = null;
            draft.TotalCost = null;
            draft.GSTTax = null;
            draft.PSTTax = null;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultListings.undo();
        }
      },
    }),
    updateListingToCart: builder.mutation<
      ShoppingCartItem,
      {
        listing: ListingPreview;
        userId: string;
        body: { ListingID: number; Quantity: number; ShoppingCartItemID?: number };
      }
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
            let quantity = 0;
            draft.Items = draft.Items.map((item) => {
              if (item.ShoppingCartItemID === body.ShoppingCartItemID) {
                item.Quantity = body.Quantity;
              }
              quantity += item.Quantity;
              return item;
            });
            draft.TotalQuantity = quantity;
            draft.Subtotal = null;
            draft.TotalCost = null;
            draft.GSTTax = null;
            draft.PSTTax = null;
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
            draft.Subtotal = null;
            draft.TotalCost = null;
            draft.GSTTax = null;
            draft.PSTTax = null;
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

export const {
  useAddListingToCartMutation,
  useUpdateListingToCartMutation,
  useCheckoutMutation,
  useRetryCheckoutMutation,
  useShoppingCartQuery,
  useRemoveListingFromCartMutation,
} = shoppingCartApi;
