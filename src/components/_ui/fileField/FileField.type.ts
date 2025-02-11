import { TextFieldProps } from '@mui/material'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

export type FileFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = Omit<TextFieldProps, 'label' | 'placeholder'> & {
  name: TName
  control: Control<TFieldValues>
  accept?: string
  label?: string
  loading?: boolean
  loadingText?: string
  failed?: boolean
}
