import { TPaginationApiParams, TPaginationApiResponse } from '@/types';
import { api } from './api.config'
import { DocumentDTO } from '@/dto/Document.dto';

export const documentsApi = api.injectEndpoints({
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
      invalidatesTags: [{ type: "Documents", id: "LIST" }],
    }),

    getAllDocuments: builder.query<TPaginationApiResponse<DocumentDTO>, TPaginationApiParams>({
      query: (params) => ({ url: '/api/get-files', params }),
      providesTags: (result, error) => (!error ? [...result!.list.map(({ _id }) => ({ type: 'Documents' as const, id: _id })), { type: 'Documents', id: 'LIST' }] : [{ type: 'Documents', id: 'LIST' }]),
    }),

    deleteDocument: builder.mutation<void, number>({
      query: (id) => ({ url: `/api/delete-file?document_id=${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: "Documents", id: "LIST" }],
    }),
  }),
})

export const { useGetAllDocumentsQuery, useDeleteDocumentMutation, useUploadPdfMutation } = documentsApi; 