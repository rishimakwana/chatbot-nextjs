import { api } from './api.config'
import { UserDTO } from '@/dto'
import { updateUser } from '../slice/user.slice'
import { setUser } from '@/utils'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: Omit<UserDTO, 'profile'> }, { email: string; password: string; recaptchaToken: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        headers: { hideSuccessToast: 'true' },
      }),
    }),

    lawyerRegister: builder.mutation<{ token: string; user: UserDTO }, any>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
        headers: { hideSuccessToast: 'true' },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data: { token, user } }) => {
            setUser({ token, redirection: false })
            dispatch(updateUser(user))
          })
          .catch(() => { })
      },
    }),

    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({ url: '/auth/forgetPassword', method: 'POST', body }),
    }),

    resetPassword: builder.mutation<void, { token: string; password: string }>({
      query: ({ token, ...body }) => ({ url: `/auth/changePassword/${token}`, method: 'PUT', body }),
    }),

    updatePassword: builder.mutation<void, { password: string }>({
      query: (body) => ({ url: `/auth/updatePassword`, method: 'PUT', body }),
    }),

    updateLawyer: builder.mutation<{ token: string; user: UserDTO }, any>({
      query: (body) => ({
        url: '/auth/updateUser',
        method: 'PUT',
        body,
        headers: { hideSuccessToast: 'true' },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data: { user } }) => {
            dispatch(updateUser(user))
          })
          .catch(() => { })
      },
    }),

    getUser: builder.query<UserDTO, void>({
      query: () => '/auth/getProfile',
      // providesTags: ['profile'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled.then(({ data }) => dispatch(updateUser(data))).catch(() => { })
      },
    }),

    updateProfile: builder.mutation<void, Pick<UserDTO, 'fullName' | 'phone'> & Pick<UserDTO['profile'], 'street' | 'city' | 'zipCode' | 'state'>>({
      query: (body) => ({ url: '/auth/updateProfile', method: 'PUT', body }),
      // invalidatesTags: (result, error) => (!error ? ['profile'] : []),
    }),
  }),
})

export const {
  useLoginMutation,
  useLawyerRegisterMutation,
  useUpdateLawyerMutation,
  useLazyGetUserQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} = extendedApi
