import { Grid2, useTheme } from '@mui/material'

export default function ShadowTab() {
  const theme = useTheme()

  return (
    <Grid2 container spacing={5}>
      {theme.shadows.slice(1).map((item, index) => (
        <Grid2 key={index} size={2} sx={{ boxShadow: `${index + 1}`, height: 150, borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {index + 1}
        </Grid2>
      ))}
    </Grid2>
  )
}
