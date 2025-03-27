import { Stack, Typography } from '@mui/material'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <Stack component="footer" direction={'row'} justifyContent={'space-between'} py={2} px={3}>
        <Typography fontSize={14} color='text.primary'>Copyright © 2025 DocBot. All right reserved.</Typography>
        <Typography fontWeight={500} fontSize={14}><Link href="!#">Privacy Policy</Link> | <Link href="!#">Terms & Conditions</Link></Typography>
      </Stack>
    </>
  )
}
