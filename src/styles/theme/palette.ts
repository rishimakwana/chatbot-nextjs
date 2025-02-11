import { Theme } from '@mui/material'

export const createPalette = () => {
  return {
    primary: {
      main: '#01093F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B2B5C5',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF2500',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#7D82A1',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#EC9D54',
      contrastText: '#ffffff',
    },
    blue: {
      main: '#B2B5C5',
      contrastText: '#FFFFFF',
      // main: '#00163E',
      // contrastText: '#ffffff',
    },
    text: {
      primary: '#00163E',
      secondary: '#6D6E70',
      disabled: 'rgb(0 0 0 / .41)',
    },
    background: {
      default: '#f8f9fa',
      paper: '#fff',
    },
    orange: {
      main: '#FF2500',
      contrastText: '#ffffff',
    },
  } as Theme['palette']
}

/* Typescript
======================== */
declare module '@mui/material/styles' {
  interface Palette {
    blue: Palette['primary'],
    orange: Palette['primary'];
  }
  interface PaletteOptions {
    blue?: PaletteOptions['primary'],
    orange?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blue: true,
    orange: true

  }
}
