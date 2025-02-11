import { TStyle } from '@/types'

export const style: TStyle = {
  dialogTitle: {
    alignItems: 'start',
    py: 1.5,
    borderBottom: 1,
    borderColor: 'divider',
    wordBreak: 'break-word',
  },
  dialogContent: {
    p: 0,
    overflow: 'auto',
    display: 'grid',
    bgcolor: 'background.default',
  },
  image: {
    width: 'auto',
    maxWidth: 'unset',
    height: 'auto',
    margin: 'auto',
  },
}
