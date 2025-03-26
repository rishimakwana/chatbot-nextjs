import { Control, FieldPath, FieldValues } from 'react-hook-form'

export type OtpFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  control: Control<TFieldValues>
  helperText?: React.ReactNode
}
