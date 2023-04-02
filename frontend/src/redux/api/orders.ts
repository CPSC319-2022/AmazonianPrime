import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedOrders } from '../../types/paginatedOrders';
import { OrderItems } from '../../types/OrderItems';

const LIMIT = 8;
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query<PaginatedOrders, { orderId: string | undefined; userId: string | undefined; page: number }>({
      query: ({ orderId, userId, page }) => {
        return `admin/orders?offset=${LIMIT * (page - 1)}&limit=${LIMIT}
        ${orderId ? `&orderId=${orderId}` : ``}${userId ? `&userId=${userId}` : ``}`;
      },
      providesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery, useLazyGetOrdersQuery } = ordersApi;
