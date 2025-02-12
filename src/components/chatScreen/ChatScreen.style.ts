import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    bgcolor: 'background.paper',
    height: 'calc(100vh - 100px)',
    width: '100%',
  },
  bot_avatar:{
    position: 'relative',
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: 300, 
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #EBECF0', 
    '& img': {
      width: '24px',
      height: '24px',
      objectFit: 'contain',
    }
  }
}
