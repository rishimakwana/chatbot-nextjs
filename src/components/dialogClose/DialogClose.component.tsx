import { IconButton, SxProps, Fab, Box } from '@mui/material'
import { MdClose } from 'react-icons/md'
import { DialogCloseProps } from './DialogClose.type'

export default function DialogClose({ sx, variant = 'relative', onClick }: DialogCloseProps) {
  const getStyles = (variant: string): SxProps => {
    switch (variant) {
      case 'absolute':
        return {
          position: 'absolute',
          top: 16,
          right: 16,
        }
      case 'top':
        return {
          position: 'absolute',
          top: -16,
          right: -16,
          width: 38,
          height: 38,
        }
      case 'relative':
      default:
        return {
          ml: 'auto',
          alignSelf: 'start',
        }
    }
  }

  const Component = variant === 'top' ? Fab : IconButton
  const size = variant === 'top' ? 'small' : undefined
  const edge = variant === 'relative' ? 'end' : undefined

  return (
    <Box component={Component} size={size} edge={edge} onClick={onClick} sx={{ ...getStyles(variant), ...sx } as SxProps}>
      <MdClose />
    </Box>
  )
}
