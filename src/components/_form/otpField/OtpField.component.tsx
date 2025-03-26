import { OTPInput, SlotProps } from 'input-otp'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormHelperText, Stack } from '@mui/material'

import { OtpFieldProps } from './OtpField.type'
import { style } from './OtpField.style'

export default function OtpField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: OtpFieldProps<TFieldValues, TName>): JSX.Element {
  const { control, name, helperText } = props

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as any}
      render={({ fieldState: { error }, field: { ref, value, onChange } }) => (
        <FormControl sx={style.root} error={!!error}>
          <OTPInput containerClassName="input-otp-container" value={value} onChange={onChange} ref={ref} maxLength={6} render={({ slots }) => slots.map((slot, index) => <Slot {...slot} key={index} />)} />
          <FormHelperText>{error ? error?.message : helperText}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

function Slot(props: SlotProps) {
  return (
    <Stack direction="row" className={`${props.isActive ? 'active' : ''} `} sx={style.slot}>
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </Stack>
  )
}

function FakeCaret() {
  return (
    <Stack sx={style.fakeCaret}>
      <div />
    </Stack>
  )
}
