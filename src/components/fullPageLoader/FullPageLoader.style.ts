import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    color: 'primary.main',
    opacity: '1 !important',
    zIndex: (theme) => theme.zIndex.drawer + 1,
    pointerEvents: 'none',
    '&.MuiBackdrop-root': {
      flexFlow: 'column',
      bgcolor: 'background.paper',
      py: 5,
    },
  },
  progressContainer: {
    flexGrow: 1,
    py: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
}
