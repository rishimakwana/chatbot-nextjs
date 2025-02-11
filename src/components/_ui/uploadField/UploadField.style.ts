import { TStyle } from '@/types'

export const style: TStyle = {
  rootContainer: {
    p: '1px',
    display: 'block',
    position: 'relative',
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23ccc' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
    backgroundPosition: 'center',
    overflow: 'hidden',
    borderRadius: 2,
    bgcolor: 'background.default',
    '&.error': {
      backgroundImage: (theme) =>
        `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23${theme.palette.error.main.replace('#', '')}FF' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
    },
  },
  placeholderContainer: {
    cursor: 'pointer',
    outline: 'unset !important',
    ':hover, :focus-visible': {
      '.heading': {
        textDecoration: 'underline',
      },
    },
  },
}
