import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://127.0.0.1:8080/api` }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "/user",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
