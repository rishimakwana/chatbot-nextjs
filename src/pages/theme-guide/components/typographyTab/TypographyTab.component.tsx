import { Stack, Typography, useTheme } from '@mui/material'

export default function TypographyTab() {
  const theme = useTheme()

  return (
    <Stack sx={{ gap: 2 }}>
      <Typography variant="display1">
        Display 1: {theme.typography.display1.fontSize}px, {theme.typography.display1.fontWeight}
      </Typography>
      <Typography variant="display2">
        Display 2: {theme.typography.display2.fontSize}px, {theme.typography.display2.fontWeight}
      </Typography>
      <Typography variant="h1">
        Heading 1: {theme.typography.h1.fontSize}px, {theme.typography.h1.fontWeight}
      </Typography>
      <Typography variant="h2">
        Heading 2: {theme.typography.h2.fontSize}px, {theme.typography.h2.fontWeight}
      </Typography>
      <Typography variant="h3">
        Heading 3: {theme.typography.h3.fontSize}px, {theme.typography.h3.fontWeight}
      </Typography>
      <Typography variant="h4">
        Heading 4: {theme.typography.h4.fontSize}px, {theme.typography.h4.fontWeight}
      </Typography>
      <Typography variant="body1">
        Body 1: {theme.typography.body1.fontSize}px, {theme.typography.body1.fontWeight}
      </Typography>
      <Typography variant="body2">
        Body 2: {theme.typography.body2.fontSize}px, {theme.typography.body2.fontWeight}
      </Typography>
    </Stack>
  )
}
