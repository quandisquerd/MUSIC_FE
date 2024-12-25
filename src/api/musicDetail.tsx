import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../util/pause";
const API = import.meta.env.VITE_API_URL;

const musicdetailApi = createApi({
  reducerPath: "musicdetail",
  tagTypes: ["Musicdetail"],
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getCommentWithMusic: builder.query({
      query: (id) => ({
        url: `/comment/${id}`,
        mode: "cors",
      }),
      providesTags: ["Musicdetail"],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `/comment`,
        method: "POST",
        body: data?.data,
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      }),
      invalidatesTags: ["Musicdetail"],
    }),
  }),
});

export const { useGetCommentWithMusicQuery, useAddCommentMutation } = musicdetailApi;
export default musicdetailApi;
