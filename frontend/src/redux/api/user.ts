import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => 'user',
    }),
  }),
});

export const { useGetUserQuery } = userApi;
