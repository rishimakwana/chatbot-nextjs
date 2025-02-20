import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    gap: 2,
    height: 'calc(100vh - 100px)',
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
  },
  upgradePlan: {
    width: 32,
    height: 32,
    border: '1px solid #00163E',
    bgcolor: 'white',
    borderRadius: 10,
    p: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'center'
  },
  mobileActionIcon: {
    width: 30,
    height: 30,
    mr: 1.5,
    minHeight: 'unset',
  },
}
