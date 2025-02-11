import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    my: 10,
  },
  container: {
    textAlign: 'center',
    alignItems: 'center',
    gap: 2,
    '.icon': {
      fontSize: 65,
      mb: 1,
      '&.error': {
        color: 'error.main',
      },
      '&.success': {
        color: 'success.light',
      },
    },
  },
  reloadButton: {
    px: 3,
  },
}
