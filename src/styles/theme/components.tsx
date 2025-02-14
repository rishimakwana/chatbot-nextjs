import { Theme } from '@mui/material'
import { GridOverlay } from '@mui/x-data-grid'
import type {} from '@mui/lab/themeAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'
import type {} from '@mui/x-date-pickers/themeAugmentation'

export const overridesComponent = (theme: Theme) => {
  return {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          display1: 'div',
          display2: 'div',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { disabled: true },
              style: theme.unstable_sx({
                '.MuiInputLabel-shrink, .MuiFormHelperText-root': { color: `${theme.palette.text.secondary} !important` },
              }),
            },
          ],
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '& > .MuiInputLabel-outlined': {
            '&.MuiInputLabel-shrink, &.MuiInputLabel-shrink ~ div > fieldset.MuiOutlinedInput-notchedOutline': {
              fontSize: `calc(${theme.typography.body1.fontSize}px + 2px) !important`,
            },
          },
        }),
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        row: theme.unstable_sx({
          mr: -2,
        }),
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: theme.unstable_sx({
          borderRadius: 5,
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: theme.unstable_sx({
          '&, &:last-child': {
            py: 1,
            px: { xs: 0.5, sm: 1 },
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: theme.unstable_sx({
          mx: 1.75,
          fontSize: '0.8125rem',
          ':empty': {
            mt: 0,
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: theme.unstable_sx({
          fontWeight: 600,
          cursor: 'pointer',
        }),
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        disableClearable: true,
        blurOnSelect: true,
        clearOnBlur: true,
        autoHighlight: true,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: theme.unstable_sx({
          '&:not(.MuiDialog-paperFullScreen)': {
            borderRadius: 5,
            [theme.breakpoints.down('sm')]: {
              margin: 2.5,
              maxWidth: `calc(100% - ${theme.spacing(5)}) !important`,
              '&.MuiDialog-paperFullWidth': {
                width: 1,
              },
            },
          },
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: theme.unstable_sx({
          p: 3,
          '&.MuiDialogContent-dividers + .MuiDialogActions-root': {
            py: 1.5,
          },
        }),
      },
    },
    MuiDialogTitle: {
      defaultProps: {
        variant: 'h1',
      },
      styleOverrides: {
        root: theme.unstable_sx({
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }),
      },
    },
    MuiDialogActions: {
      defaultProps: {
        disableSpacing: true,
      },
      styleOverrides: {
        root: theme.unstable_sx({
          px: 3,
          pt: 0,
          pb: 3,
          gap: 2,
        }),
      },
    },
    MuiSwipeableDrawer: {
      defaultProps: {
        disableSwipeToOpen: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { size: 'small' },
              style: theme.unstable_sx({
                fontSize: 'body1.fontSize',
                fontWeight: 500,
                borderRadius: 2.5,
                py: 1.25,
                px: 2.5,
              }),
            },
            {
              props: { size: 'medium' },
              style: theme.unstable_sx({
                py: 1.375,
                px: 2.5,
                minWidth: { xs: 'unset', sm: 112 },
                borderRadius: 1.5,
                fontSize: 18,
                fontWeight: 500,
              }),
            },
            {
              props: { size: 'large' },
              style: theme.unstable_sx({
                py: 1.5,
                px: 2.5,
                minWidth: { xs: 'unset', md: 182 },
                borderRadius: 2,
                fontSize: 18,
                fontWeight: 500,
              }),
            },
            {
              props: { variant: 'outlined' },
              style: theme.unstable_sx({
                border: `1px solid #CFD0D7`,
                color: '#020617',
                py: 1.5,
                px: 2.5,
                borderRadius: 2,
                fontSize: 12,
                fontWeight: 400,
                '&:hover': {
                  backgroundColor: '#EBECF0',
                  borderColor: theme.palette.primary.main,
                  fontSize: 13,
                },
              }),
            },
            {
              props: { variant: 'orange' },
              style: theme.unstable_sx({
                backgroundColor: theme.palette.orange.main,
                color: theme.palette.orange.contrastText,
                py: 1.5,
                px: 2.5,
                minWidth: { xs: 'unset', md: 182 },
                borderRadius: 2,
                fontSize: 18,
                fontWeight: 500,
                '&:hover': {
                  fontSize: 19,
                  borderColor: theme.palette.primary.main,
                },
              }),
            },
          ],
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        disableInteractive: true,
        arrow: true,
        placement: 'top',
        enterTouchDelay: 200,
        enterDelay: 700,
      },
      styleOverrides: {
        tooltip: theme.unstable_sx({
          fontSize: 13,
          fontWeight: 300,
        }),
      },
    },
    MuiDataGrid: {
      defaultProps: {
        // TODO: test it
        autoHeight: true,
        row: [],
        rowCount: 0,
        rowHeight: 53,
        columnHeaderHeight: 40,
        disableRowSelectionOnClick: true,
        disableColumnMenu: true,
        paginationMode: 'server',
        pageSizeOptions: [10, 25, 50, 100],
        showCellVerticalBorder: true,
        showColumnVerticalBorder: true,
        // TODO: update it
        slots: {
          noRowsOverlay: () => <GridOverlay sx={{ color: 'text.secondary' }}>No record found</GridOverlay>,
        },
        slotProps: {
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        },
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '--DataGrid-rowBorderColor': theme.palette.divider,
          color: '#060D01',
          wordBreak: 'break-word',
          display: 'grid',
          animation: 'fadeIn 0.5s forwards',
          '&.MuiDataGrid-withBorderColor, .MuiDataGrid-withBorderColor': {
            borderColor: 'var(--DataGrid-rowBorderColor)',
          },
          '.MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            outline: 'unset !important',
          },
          '.MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
            fontSize: 'body1.fontSize',
          },
          '.MuiDataGrid-row--dynamicHeight': {
            '.MuiDataGrid-cell': {
              py: 1.25,
              display: 'flex',
              alignItems: 'center',
              minHeight: 40,
            },
          },
        }),
      },
    },
    MuiGrid2: {
      defaultProps: {
        spacing: 2.5,
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'unset',
        },
      },
    },
    MuiDivider: {
      defaultProps: {
        component: 'div',
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'dashed' },
              style: theme.unstable_sx({
                backgroundImage: (theme) =>
                  `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='14' ry='14' stroke='${theme.palette.divider}' stroke-width='2' stroke-dasharray='6%2c 6' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
                border: 0,
                height: '1px',
                mx: -3.75,
                position: 'relative',
                '--circle-bg': theme.palette.background.default,
                '&:before, &:after': {
                  content: `''`,
                  position: 'absolute',
                  height: 33,
                  width: 33,
                  top: 0,
                  left: 0,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '100%',
                  bgcolor: 'var(--circle-bg)',
                },
                '&:after': {
                  left: 'unset',
                  right: 0,
                  transform: 'translate(50%, -50%)',
                },
              }),
            },
          ],
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        variant: 'scrollable',
      },
    },
    MuiTab: {
      styleOverrides: {
        root: theme.unstable_sx({
          typography: 'body1',
          fontWeight: 550,
        }),
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: theme.unstable_sx({ p: 0 }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: theme.unstable_sx({
          borderRadius: 2,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        sizeSmall: theme.unstable_sx({
          fontWeight: 400,
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        message: theme.unstable_sx({
          alignSelf: 'center',
        }),
        outlined: theme.unstable_sx({
          bgcolor: 'background.paper',
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          '& fieldset': {
            borderColor: '#e0e0e0',
          },
          '&:hover fieldset': {
            borderColor: '#bdbdbd',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#9e9e9e',
          },
        },
        input: {
          padding: '16px',
        },
      },
    },
  } as Theme['components']
}

/* Typescript
======================== */
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true
    orange: true
  }
}

declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    dashed: true
  }
}
