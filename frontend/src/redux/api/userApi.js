import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query : () => `/me` ,
      transformResponse : (result) => result.user
    }),
  }),
});

export const { useGetMeQuery } = userApi;
