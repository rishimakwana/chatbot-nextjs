import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    bgcolor: 'background.paper',
    px: 1,
    py: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  docCard: {
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    bgcolor: 'background.paper',
  },
  docCardText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "50px",
  }
}
