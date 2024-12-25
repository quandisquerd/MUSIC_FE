import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../util/pause";
const API = import.meta.env.VITE_API_URL;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
};

const waveformApi = createApi({
  reducerPath: "waveform",
  tagTypes: ["Waveform"],
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    getWaveform: builder.query({
      query: (url) => ({
        url: `/waveform/${url}`,
        headers: headers,
        mode: "cors",
      }),
      providesTags: ["Waveform"],
    }),
  }),
});

export const { useGetWaveformQuery } = waveformApi;
export default waveformApi;
