import { getCookie } from '@/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'apis',
  tagTypes: ['Messages', 'Sessions','Documents'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { }) => {
      if (getCookie('token')) headers.set('Authorization', `Bearer ${getCookie('token')}`)
      return headers
    }
  }),
  endpoints: () => ({}),
})