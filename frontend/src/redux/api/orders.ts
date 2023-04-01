import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedOrders } from '../../types/paginatedOrders';
import { OrderItems } from '../../types/OrderItems';

const LIMIT = 8;
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query<PaginatedOrders, { userId: string | undefined; page: number }>({
      query: ({ userId, page }) => {
        return `admin/orders?offset=${LIMIT * (page - 1)}&limit=${LIMIT}${userId && `&userid="${userId}"`}`;
      },
      providesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery, useLazyGetOrdersQuery } = ordersApi;
