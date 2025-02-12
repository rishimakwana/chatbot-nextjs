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
    border: '1px solid #CFD0D7',
    borderRadius: '8px',
    bgcolor: 'background.paper',
    height: '40px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    position: 'relative',
    padding: 1,
  },
  docCardText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "50px",
    fontSize: '13px',
  },
}
