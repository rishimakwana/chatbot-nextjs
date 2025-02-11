import Link from 'next/link'
import Image from 'next/image'
import { Box, Stack } from '@mui/material'

import logo from '@/../public/images/logo.svg'
import { LogoProps } from './Logo.type'

export default function Logo(props: LogoProps) {
  return (
    <Stack>
      <Link href="/" style={{ display: 'flex', justifyContent:'flex-end' }}>
        <Image src={logo} alt="logo" priority />
      </Link>
    </Stack>
  )
}
