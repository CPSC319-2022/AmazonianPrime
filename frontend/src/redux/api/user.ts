import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/user';
import { Payment } from '../../types/payment';
import { Address } from '../../types/address';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  endpoints: (builder) => ({
    login: builder.query<User, string>({
      query: (gmail: string) => `user/${gmail}`,
    }),
    signup: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: `user/update`,
          credentials: 'include',
          method: 'POST',
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
    }),
  }),
});

export const { useLoginQuery, useLazyLoginQuery, useSignupMutation, useAddAddressMutation, useAddPaymentMutation } = userApi;
