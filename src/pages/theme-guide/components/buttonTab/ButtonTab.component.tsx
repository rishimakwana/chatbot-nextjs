import { Button, Stack, Typography } from '@mui/material'

export default function ButtonTab() {
  return (
    <Stack gap={5} sx={{ '& > *': { gap: 4, alignItems: 'end', '& > *': { alignItems: 'start', gap: 0.5, flex: 1 } } }}>
      {/* Variant: text */}
      <Stack direction="row">
        <Stack>
          <Button variant="text" size="small">
            Button
          </Button>
          <Typography variant="body2">Variant: text, Size: small</Typography>
        </Stack>
        <Stack>
          <Button variant="text" size="medium">
            Button
          </Button>
          <Typography variant="body2">Variant: text, Size: medium</Typography>
        </Stack>
        <Stack>
          <Button variant="text" size="large">
            Button
          </Button>
          <Typography variant="body2">Variant: text, Size: large</Typography>
        </Stack>
      </Stack>

      {/* Variant: outlined */}
      <Stack direction="row">
        <Stack>
          <Button variant="outlined" size="small">
            Button
          </Button>
          <Typography variant="body2">Variant: outlined, Size: small</Typography>
        </Stack>
        <Stack>
          <Button variant="outlined" size="medium">
            Button
          </Button>
          <Typography variant="body2">Variant: outlined, Size: medium</Typography>
        </Stack>
        <Stack>
          <Button variant="outlined" size="large">
            Button
          </Button>
          <Typography variant="body2">Variant: outlined, Size: large</Typography>
        </Stack>
      </Stack>

      {/* Variant: contained */}
      <Stack direction="row">
        <Stack>
          <Button variant="contained" size="small">
            Button
          </Button>
          <Typography variant="body2">Variant: contained, Size: small</Typography>
        </Stack>
        <Stack>
          <Button variant="contained" size="medium">
            Button
          </Button>
          <Typography variant="body2">Variant: contained, Size: medium</Typography>
        </Stack>
        <Stack>
          <Button variant="contained" size="large">
            Button
          </Button>
          <Typography variant="body2">Variant: contained, Size: large</Typography>
        </Stack>
      </Stack>

      {/* Variant: gradient */}
      <Stack direction="row">
        <Stack>
          <Button variant="gradient" size="small">
            Button
          </Button>
          <Typography variant="body2">Variant: gradient, Size: small</Typography>
        </Stack>
        <Stack>
          <Button variant="gradient" size="medium">
            Button
          </Button>
          <Typography variant="body2">Variant: gradient, Size: medium</Typography>
        </Stack>
        <Stack>
          <Button variant="gradient" size="large">
            Button
          </Button>
          <Typography variant="body2">Variant: gradient, Size: large</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
