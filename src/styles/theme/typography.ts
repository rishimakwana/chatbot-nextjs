import { Theme, ThemeOptions } from '@mui/material'
import { Barlow, Figtree, Righteous } from 'next/font/google'

const barlow = Barlow({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

const figtree = Figtree({
  display: 'swap',
  subsets: ['latin'],
})

const righteous = Righteous({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
})

export const createTypography = () => {
  return {
    // fontFamily: `${barlow.style.fontFamily}, system-ui, sans-serif`,
    fontFamily: `${figtree.style.fontFamily}, system-ui, sans-serif`,
    // fontFamily: `${righteous.style.fontFamily}, system-ui, sans-serif`,
    display1: {
      fontSize: 48,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    display2: {
      fontSize: 32,
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h1: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 17,
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body2: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.2,
    },
    button: {
      textTransform: 'unset',
      lineHeight: 1.2,
    },
  } as Theme['typography']
}

export const overridesTypography = (theme: Theme) => {
  return {
    display1: theme.unstable_sx({
      color: 'text.primary',
    }),
    display2: theme.unstable_sx({
      color: 'text.primary',
      fontSize: { xs: 28, md: 'display2.fontSize' },
    }),
    h1: theme.unstable_sx({
      color: 'text.primary',
    }),
    h2: theme.unstable_sx({
      color: 'text.primary',
    }),
    h3: theme.unstable_sx({
      color: 'text.secondary',
    }),
    h4: theme.unstable_sx({
      color: 'text.secondary',
    }),
    body1: theme.unstable_sx({
      color: 'text.secondary',
    }),
    body2: theme.unstable_sx({
      color: 'text.secondary',
    }),
  } as ThemeOptions['typography']
}

/* Typescript
======================== */
declare module '@mui/material/styles' {
  interface TypographyVariants {
    display1: React.CSSProperties
    display2: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    display1?: React.CSSProperties
    display2?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display1: true
    display2: true
    h5: false
    h6: false
    subtitle1: false
    subtitle2: false
    caption: false
    overline: false
    button: false
  }
}
