import { TStyle } from '@/types'
import { alpha } from '@mui/material'

export const style: TStyle = {
  root: {
    display: 'flex',
    flexFlow: 'column',
    gap: 2,
    '> *:last-child': {
      mb: 3.5,
    },
  },
  billingAlert: {
    borderColor: (theme) => alpha(theme.palette.error.main, 0.15),
  },
  billingBtn: {
    alignSelf: 'center',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
}
