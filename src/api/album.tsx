import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API = import.meta.env.VITE_API_URL;
import { pause } from '../util/pause'
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
}

const albumApi = createApi({
    reducerPath: 'album',
    tagTypes: ['Album'],
    baseQuery: fetchBaseQuery({
        baseUrl: API,
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getAlbum: builder.query({
            query: () => ({
                url: `/album`,
                headers: headers,
                mode: 'cors',
            }),
            providesTags: ['Album'],
        })
    })
})


export const { useGetAlbumQuery } = albumApi
export default albumApi