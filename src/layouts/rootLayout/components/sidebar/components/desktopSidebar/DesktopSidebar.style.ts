import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    bgcolor: 'background.paper',
    gap: 2,
    borderRight: '1px solid',
    borderColor: 'divider',
    transition: 'width 0.3s ease-in-out',
    height: '100vh',
    maxWidth: '264px',
    pb: 2,
    px:2
  },
  logo: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    mb: 2,
  },
  plan_upgrade: {
    display: 'flex',
    alignContent: 'flex-start',
    flexDirection: 'row',
  }
}
