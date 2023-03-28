import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedUsers } from '../../types/paginatedUsers';

const LIMIT = 4;
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['ShippingAddresses', 'Payments', 'Banking'],
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedUsers, { page: number, name: string }>({
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
