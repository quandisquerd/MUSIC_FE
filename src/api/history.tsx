import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API = import.meta.env.VITE_API_URL;
const historyApi = createApi({
  reducerPath: "history",
  tagTypes: ["History"],
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getAllHistoryWithUser: builder.query({
      query: (token) => ({
        url: `/history`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      providesTags: ["History"],
    }),
   
  }),
});

export const { } = historyApi;
export default historyApi;
