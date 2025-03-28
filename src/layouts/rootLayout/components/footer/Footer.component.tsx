import { Theme } from '@emotion/react'
import { Stack, SxProps, Typography } from '@mui/material'
import Link from 'next/link'

interface FooterProps {
  py?: number
  px?: number
  sx?: SxProps<Theme>
}

export default function Footer({ py = 2, px = 3, sx }: FooterProps) {
  return (
    <Stack component="footer" direction="row" justifyContent="space-between" py={py} px={px} sx={sx}>
      <Typography fontSize={14} color="text.primary">
        Copyright © 2025 DocBot. All rights reserved.
      </Typography>
      <Typography fontWeight={500} fontSize={14}>
        <Link href="#">Privacy Policy</Link> | <Link href="#">Terms & Conditions</Link>
      </Typography>
    </Stack>
  )
}
