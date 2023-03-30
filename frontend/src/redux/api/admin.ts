import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedUsers } from '../../types/paginatedUsers';
import { User } from '../../types/user';

const LIMIT = 8;
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedUsers, { page: number; name: string }>({
      query: ({ page, name }) => {
        return `admin/users?offset=${LIMIT * (page - 1)}&limit=${LIMIT}${name && `&name="${name}"`}`;
      },
      providesTags: ['Users'],
    }),
    changePrivilegeLevel: builder.mutation<User, { user: string; body: Partial<User> }>({
      query({ user, body }) {
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
      async onQueryStarted({ user, body }, { dispatch, queryFulfilled }) {
        const patchResultListings = dispatch(
          adminApi.util.updateQueryData('getUsers', { page: 1, name: '' }, (draft) => {
            draft.Data = draft.Data.map((userData) => {
              if (userData.UserID === user) {
                return {
                  ...userData,
                  IsAdmin: !userData.IsAdmin,
                };
              }
              return userData;
            }) as User[];
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultListings.undo();
        }
      },
      invalidatesTags: ['Users'],
    }),
    removeUser: builder.mutation<User, { user: string; body: Partial<User> }>({
      query({ user, body }) {
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
      async onQueryStarted({ user, body }, { dispatch, queryFulfilled }) {
        const patchResultListings = dispatch(
          adminApi.util.updateQueryData('getUsers', { page: 1, name: '' }, (draft) => {
            draft.Data = draft.Data.filter((userData) => userData.UserID !== user) as User[];
            draft.TotalUsers = (Number(draft.TotalUsers) - 1).toString();
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResultListings.undo();
        }
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery, useChangePrivilegeLevelMutation, useRemoveUserMutation } =
  adminApi;
