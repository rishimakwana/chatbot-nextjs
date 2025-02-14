import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, Fade, Grid2, Stack } from '@mui/material'

import Logo from '@/components/logo/Logo.component'
import backgroundImg from '@/../public/images/pages/auth-layout-bg.jpg'
import { style } from './AuthLayout.style'
import { AuthLayoutProps } from './AuthLayout.props'

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter()

  return (
    <Stack sx={style.root}>
      <Container>
        <Grid2 container className="min-height-full" spacing={0}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack sx={style.contentBox}>
              <Logo disableLink />

              {/* <LoginForm /> */}
              <Fade in={true} timeout={500} key={router.pathname}>
                <Stack sx={style.childrenBox}>{children}</Stack>
              </Fade>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>

      <Stack sx={style.imageBox}>
        <Stack sx={style.imageBoxContent} className="min-height-full">
          <Image src={backgroundImg} alt="background image" fill sizes="50vw" />
        </Stack>
      </Stack>
    </Stack>
  )
}
