import * as yup from 'yup'
import { emailTest, passwordTest } from '@/utils'

export const schema = yup.object({
  email: yup.string().email().trim().required().max(100).test(emailTest),
  fullName: yup.string().trim().required().max(100),
  termsAccepted: yup.boolean().oneOf([true], 'Required *'),
  password: yup.string().trim().required().max(100).test(passwordTest),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .oneOf([yup.ref('password')], 'Password and confirm password is different'),
})

export type TSchema = yup.InferType<typeof schema>
