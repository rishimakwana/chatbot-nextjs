import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, Fade, Stack } from '@mui/material'

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
      <Stack alignItems={{ xs: 'center', md: 'start' }}>
        <Logo collapsed={true} />
      </Stack>

      <Container>
        <Stack sx={style.contentBox}>
          <Fade in={true} timeout={500} key={router.pathname}>
            <Stack sx={style.childrenBox}>
              <FormComponent />
            </Stack>
          </Fade>
        </Stack>
      </Container>

      <Stack sx={style.imageBox}>
        <Stack sx={style.imageBoxContent} className="min-height-full">
          <Image src={backgroundImg} alt="background image" fill sizes="50vw" />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AuthPage
