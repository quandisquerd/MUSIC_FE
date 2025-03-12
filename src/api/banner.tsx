import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API = import.meta.env.VITE_API_URL;
import { pause } from "../util/pause";

const bannerApi = createApi({
  reducerPath: "banner",
  tagTypes: ["Banner"],
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getAllBannerActive: builder.query({
      query: () => ({
        url: `/getbanneractive`,
      }),
      providesTags: ["Banner"],
    }),
    getAllBanner: builder.query({
        query: () => ({
          url: `/getallbanner`,
        }),
        providesTags: ["Banner"],
      }),
    findSongaddBanner: builder.mutation({
      query: (music) => ({
        url: `/findmusic`,
        method: "POST",
        body: music,
      }),
      invalidatesTags: ["Banner"],
    }),
    UpdateBanner: builder.mutation({
      query: (data) => ({
        url: `/updatebanner/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const { useGetAllBannerActiveQuery,useFindSongaddBannerMutation, useGetAllBannerQuery,useUpdateBannerMutation } = bannerApi;
export default bannerApi;
