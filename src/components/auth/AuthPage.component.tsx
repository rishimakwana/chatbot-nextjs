import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, Fade, Grid2, Stack } from '@mui/material'

import { style } from './AuthPage.style'
import Logo from '@/components/logo/Logo.component'
import backgroundImg from '@/../public/images/pages/backgroundImg.svg'

interface AuthPageProps {
  FormComponent: React.ComponentType
}

const AuthPage: React.FC<AuthPageProps> = ({ FormComponent }) => {
  const router = useRouter()

  return (
    <Stack sx={style.root}>
      <Grid2 container>
        <Grid2 size={6}>
          <Stack alignItems={{ xs: 'center', md: 'start' }}>
            <Logo collapsed={true} />
          </Stack>
          <Fade in={true} timeout={500} key={router.pathname}>
            <Stack alignItems={'center'}>
              <FormComponent />
            </Stack>
          </Fade>
        </Grid2>
        <Grid2 size={6}>
          <Stack sx={style.imageBox}>
            <Stack sx={style.imageBoxContent} className="min-height-full">
              <Image src={backgroundImg} alt="background image" fill sizes="50vw" />
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </Stack>
  )
}

export default AuthPage
