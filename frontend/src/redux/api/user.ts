import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/user';
import { Payment } from '../../types/payment';
import { Address } from '../../types/address';
import { Banking } from '../../types/banking';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['ShippingAddresses', 'Payments', 'Banking'],
  endpoints: (builder) => ({
    login: builder.query<User, string>({
      query: (gmail: string) => `user/${gmail}`,
    }),
    signup: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: `user`,
          credentials: 'include',
          method: 'PUT',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    addAddress: builder.mutation<Address, Partial<Address>>({
      query(body) {
        return {
          url: `user/address`,
          credentials: 'include',
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    addShippingAddress: builder.mutation<Address, { UserID: string; AddressID: string }>({
      query(body) {
        return {
          url: `user/shipping`,
          credentials: 'include',
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['ShippingAddresses'],
    }),
    getShippingAddress: builder.query<Address[], string>({
      query: (userId: string) => `user/shipping/${userId}`,
      providesTags: ['ShippingAddresses'],
    }),
    addPayment: builder.mutation<Payment, Partial<Payment>>({
      query(body) {
        return {
          url: `user/payment`,
          credentials: 'include',
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Payments'],
    }),
    getPayments: builder.query<Payment[], string>({
      query: (userId: string) => `user/payment/${userId}`,
      providesTags: ['Payments'],
    }),
    addBanking: builder.mutation<Banking, Partial<Banking>>({
      query(body) {
        return {
          url: `user/banking`,
          credentials: 'include',
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Banking'],
    }),
    updateBanking: builder.mutation<Banking, Partial<Banking>>({
      query(body) {
        return {
          url: `user/banking`,
          credentials: 'include',
          method: 'PUT',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['Banking'],
    }),
    getBanking: builder.query<Banking, string>({
      query: (userId: string) => `user/banking/${userId}`,
      providesTags: ['Banking'],
    }),
  }),
});

export const {
  useLoginQuery,
  useLazyLoginQuery,
  useSignupMutation,
  useAddShippingAddressMutation,
  useGetShippingAddressQuery,
  useGetPaymentsQuery,
  useUpdateBankingMutation,
  useAddAddressMutation,
  useAddPaymentMutation,
  useAddBankingMutation,
  useGetBankingQuery,
} = userApi;
