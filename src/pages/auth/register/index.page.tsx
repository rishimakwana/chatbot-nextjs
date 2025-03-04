import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, Fade, Grid2, Stack } from '@mui/material'

import { TPage } from '@/types'
import { style } from './Register.style'
import Logo from '@/components/logo/Logo.component'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import backgroundImg from '@/../public/images/pages/backgroundImg.svg'
import RegisterForm from '@/components/_form/registerForn/RegisterForm.component'

const Register: TPage = () => {
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
                    <RegisterForm />
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

Register.rootLayoutProps = {
  title: 'Register',
  pageType: 'auth',
  sidebar: false,
  header: false,
  footer: false,
}

Register.childLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default Register
