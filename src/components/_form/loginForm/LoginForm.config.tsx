import * as yup from 'yup'
import { emailTest } from '@/utils'

export const schema = yup.object({
  email: yup.string().email().trim().required().max(100).test(emailTest),
  password: yup.string().trim().required().max(100),
  recaptchaToken: yup.string().required(),
})

export type TSchema = yup.InferType<typeof schema>
