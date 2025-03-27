import * as yup from 'yup'
import { emailTest, onlyNumberTest } from '@/utils'

export const schema = yup.object({
  email: yup.string().email().trim().required().max(100).test(emailTest),
  otp: yup.string().trim().required().length(6, 'Enter complete OTP').test(onlyNumberTest),
})

export type TSchema = yup.InferType<typeof schema>
