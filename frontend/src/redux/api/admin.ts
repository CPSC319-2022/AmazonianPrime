import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedUsers } from '../../types/paginatedUsers';
import { User } from '../../types/user';

const LIMIT = 6;
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
    changePrivilegeLevel: builder.mutation<User, { user: string, body: Partial<User> }>({
      query({user, body}) {
        return {
          url: `admin/users/privilege/${user}`,
          credentials: 'include',
          method: 'PUT',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    removeUser: builder.mutation<User, { user: string, body: Partial<User> }>({
      query({user, body}) {
        return {
          url: `admin/users/${user}`,
          credentials: 'include',
          method: 'DELETE',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useChangePrivilegeLevelMutation,
  useRemoveUserMutation,
} = adminApi;
