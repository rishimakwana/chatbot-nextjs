import { FormHelperText, FormControl } from '@mui/material'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'

import { PhoneFieldProps } from './PhoneField.type'
import { PhoneInput } from './PhoneField.style'

export default function PhoneField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: PhoneFieldProps<TFieldValues, TName>): JSX.Element {
  const { control, name, placeholder, label = 'Phone Number', onChange, onBlur, ...restProps } = props

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ fieldState: { error }, field: { ref, ...restField } }) => (
        <FormControl error={!!error}>
          <PhoneInput
            {...restField}
            {...restProps}
            readOnly={restProps.readOnly}
            onChange={(value) => {
              restField.onChange(value)
              // @ts-ignore
              onChange && onChange()
            }}
            onBlur={(e) => {
              restField.onBlur()
              // @ts-ignore
              onBlur && onBlur(e)
            }}
            ref={ref}
            placeholder={placeholder || label}
            className={`${error ? 'error' : ''}`}
            defaultCountry="US"
            countrySelectProps={{ tabIndex: -1 }}
          />
          <FormHelperText>{error ? error?.message : restProps.helperText}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
