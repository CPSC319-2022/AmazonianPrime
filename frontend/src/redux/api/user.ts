import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  endpoints: (builder) => ({
    login: builder.query<User, string>({
      query: (gmail: string) => `login/${gmail}`,
    }),
    // TODO: change this to PUT
    signup: builder.query<User, void>({
      query: () => 'signup',
    }),
    deleteItinerary: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const { useLoginQuery, useLazyLoginQuery, useSignupQuery, useLazySignupQuery } = userApi;
