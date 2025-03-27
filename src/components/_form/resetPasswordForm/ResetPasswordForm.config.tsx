import * as yup from 'yup'
import { passwordTest } from '@/utils'

export const schema = yup.object({
  token: yup.string().trim().required().min(100).max(1000),
  password: yup.string().trim().required().max(100).test(passwordTest),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref('password')], 'Password and confirm password is different'),
})

export type TSchema = yup.InferType<typeof schema>
