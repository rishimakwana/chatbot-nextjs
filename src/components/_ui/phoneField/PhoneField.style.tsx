import ReactPhoneNumberInput from 'react-phone-number-input'
import { styled } from '@mui/material'
import 'react-phone-number-input/style.css'

export const PhoneInput = styled(ReactPhoneNumberInput)(({ theme }) =>
  theme.unstable_sx({
    '--PhoneInputCountrySelect-marginRight': '0',
    '--PhoneInput-color--focus': theme.palette.primary.main,
    '--PhoneInputCountrySelectArrow-color--focus': theme.palette.primary.main,
    '--PhoneInputCountryFlag-borderColor--focus': theme.palette.primary.main,
    '--PhoneInputCountrySelectArrow-width': '0.375rem',
    '--PhoneInputCountryFlag-borderColor': 'var(--border-color)',
    '--border-color': 'rgba(0, 0, 0, 0.23)',
    border: 1,
    borderColor: 'var(--border-color)',
    color: 'text.secondary',
    borderRadius: 1,
    display: 'flex',
    height: 56,
    '&.PhoneInput--disabled': {
      color: 'text.disabled',
      pointerEvents: 'none',
      '.PhoneInputInput': {
        color: 'text.disabled',
      },
    },
    '&:hover': {
      '--border-color': theme.palette.text.primary,
    },
    '&:focus-within': {
      '--border-color': theme.palette.primary.main,
      boxShadow: `0 0 0 1px var(--border-color)`,
    },
    '&.error': {
      '--border-color': theme.palette.error.dark,
      '.PhoneInputInput::placeholder': {
        color: 'error.dark',
      },
    },
    '.PhoneInputCountry': {
      pl: 1.75,
      pr: 1,
    },
    '.PhoneInputInput': {
      bgcolor: 'transparent',
      height: 1,
      border: 0,
      outline: 0,
      p: 0,
      typography: 'body1',
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      color: 'text.primary',
      '&::placeholder': {
        fontWeight: 500,
        color: 'text.secondary',
      },
    },
  }),
)
