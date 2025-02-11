import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadPdf: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/api/upload-pdf",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
})

export const { useUploadPdfMutation } = extendedApi
