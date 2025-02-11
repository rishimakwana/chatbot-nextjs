import { Control, FieldPath, FieldValues } from 'react-hook-form'

export type UploadFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  control: Control<TFieldValues>
  heading?: string | { mobile: string; desktop: string }
  description?: string | { mobile: string; desktop: string }
  helperText?: string
  disabled?: boolean
  maxFiles?: number
  size?: 'small' | 'medium'
}
