import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../util/pause";
const API = import.meta.env.VITE_API_URL;

const genreApi = createApi({
  reducerPath: "genre",
  tagTypes: ["Genre"],
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getAllGenre: builder.query({
      query: () => ({
        url: `/getallgenre`,
        mode: "cors",
      }),
      providesTags: ["Genre"],
    }),
    getOneGenre: builder.query({
      query: (id: any) => ({
        url: `/genre/${id}`,
        mode: "cors",
      }),
      providesTags: ["Genre"],
    }),
    removeGenre: builder.mutation({
      query: (id) => ({
        url: `/deletegenre/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genre"],
    }),
    addGenre: builder.mutation({
      query: (data) => ({
        url: `/addgenre`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Genre"],
    }),
    updateGenre: builder.mutation({
      query: (data) => ({
        url: `/updategenre/${data?.id}`,
        method: "PUT",
        body: data?.name,
      }),
      invalidatesTags: ["Genre"],
    }),
  }),
});

export const {
  useGetAllGenreQuery,
  useRemoveGenreMutation,
  useAddGenreMutation,
  useUpdateGenreMutation,
  useGetOneGenreQuery,
} = genreApi;
export default genreApi;
