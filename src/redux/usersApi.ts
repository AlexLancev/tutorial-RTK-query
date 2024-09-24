import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { DataType } from "../types";

const headers = {
  "Content-Type": "application/json",
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (build) => ({
    getUsers: build.query<DataType[], void>({
      query: () => `/users`,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ key }) => ({ type: "Users" as const, id: key })),
              { type: "Users" as const, id: "LIST" },
            ]
          : [{ type: "Users" as const, id: "LIST" }],
    }),
    addUser: build.mutation<void, Partial<DataType>>({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        headers,
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteUser: build.mutation<void, string>({
      query: (key) => ({
        url: `/users/${key}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } = usersApi;
