import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  endpoints: (builder) => ({
    login: builder.query<User, string>({
      query: (gmail: string) => `user/${gmail}`,
    }),
    updateUser: builder.mutation<User, Partial<User>>({
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
  }),
});

export const { useLoginQuery, useLazyLoginQuery, useUpdateUserMutation } = userApi;
