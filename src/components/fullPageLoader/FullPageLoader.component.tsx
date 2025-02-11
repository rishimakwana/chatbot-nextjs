import { CircularProgress, Backdrop, Stack } from '@mui/material'

import Logo from '../logo/Logo.component'
import { style } from './FullPageLoader.style'
import { FullPageLoaderProps } from './FullPageLoader.type'

export default function FullPageLoader({ children }: FullPageLoaderProps) {
  return (
    <Backdrop sx={style.root} open={true}>
      <Stack direction="column" sx={style.progressContainer}>
        <CircularProgress />
        {children}
      </Stack>
      <Logo />
    </Backdrop>
  )
}
