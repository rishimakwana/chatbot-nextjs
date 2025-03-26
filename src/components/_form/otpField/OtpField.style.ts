import { keyframes } from '@mui/material'
import { TStyle } from '@/types'

const caretBlink = keyframes`
  0%, 70%, 100% { opacity: 1; }
  20%, 50% { opacity: 0; }
`

export const style: TStyle = {
  root: {
    '.input-otp-container': {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      '&:has(:disabled)': { opacity: 0.3 },
      '--border-color': 'rgba(0, 0, 0, 0.23)',
    },
    input: {
      left: '0px !important',
      pl: 0,
    },
  },
  slot: {
    position: 'relative',
    maxWidth: 50,
    width: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    typography: 'h3',
    color: 'text.primary',
    border: 1,
    borderColor: 'var(--border-color)',
    '&.active': {
      '--border-color': (theme) => theme.palette.primary.main,
      boxShadow: `0 0 0 1px var(--border-color)`,
    },
  },
  fakeCaret: {
    position: 'absolute',
    pointerEvents: 'none',
    inset: 0,
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    animation: `${caretBlink} 1.2s ease-out infinite`,
    '& > div': {
      width: '1px',
      height: 0.5,
      bgcolor: (theme) => theme.palette.text.primary,
    },
  },
}
