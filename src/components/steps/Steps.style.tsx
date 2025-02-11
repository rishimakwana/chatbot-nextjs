import { TStyle } from '@/types'
import { StepsProps } from './Steps.type'

export const makeStyle = ({ variant }: StepsProps): TStyle => ({
  root: (theme) =>
    theme.unstable_sx({
      mx: -1,
      zIndex: 1,
      '.MuiStepConnector-root': {
        top: variant === 'icon' ? 23 : 15,
        '.MuiStepConnector-line': {
          borderWidth: 2,
          position: 'relative',
          zIndex: -1,
        },
        '&.Mui-active .MuiStepConnector-line, &.Mui-completed .MuiStepConnector-line': {
          borderColor: 'primary.light',
        },
        [theme.breakpoints.down('sm')]: {
          left: '-50%',
          right: '50%',
          zIndex: -1,
        },
      },
      '.MuiStepLabel-label': {
        typography: 'body1',
        mt: 1.25,
        '&.Mui-active, &.Mui-completed': {
          color: 'primary.main',
        },
      },
      '.MuiStepIcon-root': {
        fontSize: 28,
        bgcolor: 'background.paper',
      },
    }),
  stepIconRoot: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    border: 1,
    bgcolor: '#99999b',
    borderColor: '#99999b',
    color: 'primary.contrastText',
    '&.completed': {
      bgcolor: 'background.paper',
      color: 'primary.main',
      borderColor: 'primary.main',
    },
    '&.active': {
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      borderColor: 'primary.main',
    },
  },
})
