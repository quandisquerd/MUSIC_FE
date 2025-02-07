import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = import.meta.env.VITE_API_URL;

export const cloudinaryApi = createApi({
  reducerPath: "cloudinaryApi",
  tagTypes: ["Upload"],
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: ({formData,token}) => ({
        url: '/upload',  // Địa chỉ API của bạn
        method: 'POST',
        body: formData,  // Truyền FormData vào body của request
        headers: {
            Authorization: `Bearer ${token}`,
          },
      }),
    }),
    cancelUpload: builder.mutation({
        query: (token) => ({
          url: `/cancelupload`,
          mode: "cors",
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
      checkUploadFileUser: builder.query({
        query: (data) => ({
          url: `checkuploaduser`,
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
          mode: "cors",
        }),
        providesTags: ["Upload"],
      }),
    
  }),
});

export const { useUploadFileMutation, useCancelUploadMutation, useCheckUploadFileUserQuery } = cloudinaryApi;
