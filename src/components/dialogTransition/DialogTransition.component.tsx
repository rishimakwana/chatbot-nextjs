import { Slide } from '@mui/material'
import { DialogTransitionProps } from './DialogTransition.type'
import { forwardRef } from 'react'

const DialogTransition = forwardRef<unknown, DialogTransitionProps>((props, ref) => {
  return <Slide direction="up" ref={ref} in {...props} />
})

DialogTransition.displayName = 'DialogTransition'
export default DialogTransition
