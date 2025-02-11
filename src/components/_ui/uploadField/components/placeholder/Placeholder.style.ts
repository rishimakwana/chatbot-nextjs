import { alpha } from '@mui/material'
import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    cursor: 'pointer',
    py: 3,
    px: 2,
    alignItems: 'center',
    gap: 1,
    textAlign: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    fontSize: 34,
    color: 'primary.main',
    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
  },
  heading: {
    color: 'primary.main',
  },
}
