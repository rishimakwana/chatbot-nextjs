import { ReCAPTCHAProps } from 'react-google-recaptcha'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

export type RecaptchaFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  control: Control<TFieldValues>
  helperText?: string
} & Omit<ReCAPTCHAProps, 'sitekey'>
