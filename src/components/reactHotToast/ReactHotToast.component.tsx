import { GlobalStyles } from '@mui/material'
import { Toaster } from 'react-hot-toast'

export default function ReactHotToast() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 4000, className: 'toast-item' }} />
      {globalStyles}
    </>
  )
}

const globalStyles = (
  <GlobalStyles
    styles={(theme) =>
      theme.unstable_sx({
        [theme.breakpoints.down('sm')]: {
          '.toast-item': {
            width: 1,
            maxWidth: 'unset !important',
            'div[role="status"]': {
              justifyContent: 'unset',
            },
          },
        },
      })
    }
  />
)
