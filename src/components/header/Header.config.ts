import * as yup from 'yup'
import { fileTest } from '@/utils'

export const schema = yup.object({
  file: yup
    .mixed<File | string>()
    .required()
    // .test(fileTest({ size: 50, extensions: ['.pdf'] })),
})

export type TSchema = yup.InferType<typeof schema>
