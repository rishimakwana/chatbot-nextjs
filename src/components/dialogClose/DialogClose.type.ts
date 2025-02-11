import { SxProps } from '@mui/material'

export type DialogCloseProps = {
  onClick: () => void
  variant?: 'relative' | 'absolute' | 'top'
  sx?: SxProps
}
