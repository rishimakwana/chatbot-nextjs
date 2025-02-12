import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    bgcolor: 'background.paper',
    px: 5,
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
  },
  uploadCard: {
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    bgcolor: 'background.paper',
    padding: 0.5,
    position: 'relative',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}
