import ReCAPTCHA from 'react-google-recaptcha'
import { Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormHelperText } from '@mui/material'

import { RecaptchaFieldProps } from './RecaptchaField.type'

export default function RecaptchaField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: RecaptchaFieldProps<TFieldValues, TName>): JSX.Element {
  const { control, name, onChange, helperText, ...restProps } = props

  const getErrorMessage = (error: FieldError) => {
    if (error.type === 'required') return `We care about security. Please confirm you're not a bot.`
    return error.message
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ fieldState: { error }, field: { ref, ...restField } }) => (
        <FormControl error={!!error} fullWidth>
          <ReCAPTCHA {...restField} {...restProps} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string} />
          {/* INFO: This input is to focus field on error */}
          <input ref={ref} style={{ position: 'absolute', zIndex: -99, opacity: 0 }} />
          <FormHelperText>{error ? getErrorMessage(error) : helperText}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
