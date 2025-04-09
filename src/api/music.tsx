import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../util/pause";
const API = import.meta.env.VITE_API_URL;

const musicApi = createApi({
  reducerPath: "music",
  tagTypes: ["Music"],
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    fetchFn: async (...args) => {
      pause(2000)
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getTopPlayMusic: builder.query({
      query: () => ({
        url: `/topplay`,
        mode: "cors",
      }),
      providesTags: ["Music"],
    }),
    getMusicAll: builder.query({
      query: () => ({
        url: `/music`,
        mode: "cors",
      }),
      providesTags: ["Music"],
    }),
    getOneMusic: builder.query({
      query: (id) => `/music/${id}`,
      providesTags: ["Music"],
    }),
    removeMusic: builder.mutation({
      query: (id) => ({
        url: `/musics/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Music"],
    }),
    addMusic: builder.mutation({
      query: (music) => ({
        url: `/music/add`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${music?.token}`,
        },
        body: music?.data,
      }),
      invalidatesTags: ["Music"],
    }),
    updateMusic: builder.mutation({
      query: (music) => ({
        url: `/musics/${music.id}`,
        method: "PATCH",
        body: music,
      }),
      invalidatesTags: ["Music"],
    }),
    search: builder.mutation({
      query: (music) => ({
        url: `/musics/search`,
        method: "POST",
        body: music,
      }),
      invalidatesTags: ["Music"],
    }),
    updatePlayMusic: builder.mutation({
      query: (id) => ({
        url: `/updateview/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Music"],
    }),

    getAllHistoryWithUser: builder.query({
      query: (token) => ({
        url: `/history`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      providesTags: ["Music"],
    }),
    addHistorySong: builder.mutation({
      query: (data) => ({
        url: `/history`,
        method: "POST",
        body: data?.data,
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
        mode: "cors",
      }),
      invalidatesTags: ["Music"],
    }),
    addFavoriteSong: builder.mutation({
      query: (data) => ({
        url: `/favorite`,
        method: "POST",
        body: data?.data,
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
        mode: "cors",
      }),
      invalidatesTags: ["Music"],
    }),
    checkFavoriteSongWithUser: builder.query({
      query: (data) => ({
        url: `/checkfavorite/${data?.id}`,
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
        mode: "cors",
      }),
      providesTags: ["Music"],
    }),
    removeFavoriteSong: builder.mutation({
      query: (data) => ({
        url: `/remove/${data?.id}`,
        method: "DELETE",
        body: data?.data,
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
        mode: "cors",
      }),
      invalidatesTags: ["Music"],
    }),
    getAllFavoriteWithUser: builder.query({
      query: (token) => ({
        url: `/favorite`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      providesTags: ["Music"],
    }),
    getUserTopFollow: builder.query({
      query: (token) => ({
        url: `/topfollow`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      }),
      providesTags: ["Music"],
    }),
    addFollow: builder.mutation({
      query: (data) => ({
        url: `/follow`,
        method: "POST",
        body: data?.id,
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
        mode: "cors",
      }),
      invalidatesTags: ["Music"],
    }),
    unFollow: builder.mutation({
      query: (data) => ({
        url: `/unfollow`,
        method: "POST",
        body: data?.id,
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
        mode: "cors",
      }),
      invalidatesTags: ["Music"],
    }),
    checkFollow: builder.query({
      query: (data) => ({
        url: `/checkFollow/${data?.id}`,
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
        mode: "cors",
      }),
      providesTags: ["Music"],
    }),
  }),
});

export const {
  useGetTopPlayMusicQuery,
  useGetMusicAllQuery,
  useGetOneMusicQuery,
  useAddMusicMutation,
  useUpdateMusicMutation,
  useRemoveMusicMutation,
  useSearchMutation,
  useUpdatePlayMusicMutation,
  useGetAllHistoryWithUserQuery,
  useAddHistorySongMutation,
  useAddFavoriteSongMutation,
  useCheckFavoriteSongWithUserQuery,
  useRemoveFavoriteSongMutation,
  useGetAllFavoriteWithUserQuery,
  useGetUserTopFollowQuery,
  useAddFollowMutation,
  useCheckFollowQuery,
  useUnFollowMutation,
} = musicApi;
export default musicApi;
