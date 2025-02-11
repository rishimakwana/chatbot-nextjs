import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    width: 1,
    height: 1,
    display: 'flex',
    flexFlow: 'column',
    gap: 3,
    p: 3.5,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 600,
  },
  priceBox: {
    my: 0.5,
    gap: 1,
    flexFlow: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '*': {
      lineHeight: '1 !important',
    },
  },
  delPrice: {
    color: 'error.light',
    fontWeight: 500,
    opacity: 0.85,
  },
  mainPrice: {
    fontSize: 38,
  },
  duration: {
    color: 'text.secondary',
    alignSelf: 'end',
  },
  planBenefit: {
    textAlign: 'center',
    color: 'text.primary',
  },
  actionBox: {
    alignItems: 'center',
  },
  policy: {
    mt: -1.5,
    mb: { xs: 1.5, sm: 0.5 },
  },
  message: {
    color: 'info.dark',
    fontWeight: 500,
    mb: 1.5,
    bgcolor: 'background.paper',
  },
  button: {
    borderRadius: 2,
    '.MuiLoadingButton-label': {
      display: 'flex',
      flexFlow: 'column',
      gap: 0.25,
      '.price': {
        color: 'inherit',
        opacity: 0.85,
      },
    },
  },
  featuresList: {
    gap: 1.25,
  },
  featuresItem: {
    flexDirection: 'row',
    gap: 2,
  },
  checkIcon: {
    color: 'success.light',
    flexShrink: 0,
  },
}
