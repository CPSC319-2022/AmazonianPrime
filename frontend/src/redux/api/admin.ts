import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/user';

const LIMIT = 2;
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['ShippingAddresses', 'Payments', 'Banking'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], { page: number, name: string }>({
      query: ({ page, name }) => {
        return `admin/users?offset=${LIMIT * (page - 1)}&limit=${LIMIT}${
          name && `name="${name}"&`
        }`;
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = adminApi;
