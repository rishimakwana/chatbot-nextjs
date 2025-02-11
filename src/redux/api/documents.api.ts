import { TPaginationApiParams, TPaginationApiResponse } from '@/types';
import { api } from './api.config'
import { DocumentDTO } from '@/dto/Document.dto';

export const documentsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getAllDocuments: builder.query<TPaginationApiResponse<DocumentDTO>, TPaginationApiParams>({
      query: (params) => ({ url: '/api/get-files', params }),
      providesTags: (result, error) => (!error ? [...result!.list.map(({ _id }) => ({ type: 'session' as const, id: _id })), { type: 'session', id: 'LIST' }] : [{ type: 'session', id: 'LIST' }]),
    }),
  }),
})

export const { useGetAllDocumentsQuery } = documentsApi; 