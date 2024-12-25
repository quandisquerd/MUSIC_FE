import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'
const API = import.meta.env.VITE_API_URL;


const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: API,
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (user: any) => ({
                url: `/signin`,
                mode: 'cors',
                method: 'POST',
                body: user
            }),
        }),
        signup: builder.mutation({
            query: (user: any) => ({
                url: `/signup`,
                mode: 'cors',
                method: 'POST',
                body: user
            }),
        }),
    })
})

export const { useSigninMutation, useSignupMutation } = authApi
export default authApi