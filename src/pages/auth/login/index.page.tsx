import Image from 'next/image'
import { useRouter } from 'next/router'
import { Grid2, Stack, Container, Fade } from '@mui/material'

import { TPage } from '@/types'
import { style } from './Login.style'
import Logo from '@/components/logo/Logo.component'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import backgroundImg from '@/../public/images/pages/backgroundImg.svg'
import LoginForm from '@/components/_form/loginForm/LoginForm.component'

const Login: TPage = () => {
  const router = useRouter()

  return (
    <>
      <Stack sx={style.root}>
        <Stack alignItems="start">
          <Logo collapsed={true} />
        </Stack>

        <Container>
          <Grid2 container className="min-height-full" spacing={0}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Stack sx={style.contentBox}>
                <Fade in={true} timeout={500} key={router.pathname}>
                  <Stack sx={style.childrenBox}>
                    <LoginForm />
                  </Stack>
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
    </>
  )
}

Login.rootLayoutProps = {
  title: 'Login',
  pageType: 'auth',
  sidebar: false,
  header: false,
  footer: false,
}

Login.childLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default Login
