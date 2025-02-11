import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Grid2, Stack, Typography, Link as MuiLink, Fade } from '@mui/material'

import LawyerAuthLayout from '@/layouts/lawyerAuthLayout/LawyerAuthLayout.component'
import { TPage } from '@/types'
import { useReduxSelector } from '@/hooks'
import LoginForm from '@/components/_form/loginForm/LoginForm.component'

const LawyerRegister: TPage = () => {
  const router = useRouter()
  const [stepValidating, setStepValidating] = useState(true)
  const [stepChanging, setStepChanging] = useState<'next' | 'back' | null>(null)
  const { userData } = useReduxSelector((state) => state.user)

  return (
    <Grid2 container>
      {/* Header */}
      <Grid2 size={12} mb={1}>
        <LoginForm />
        {/* <Stack gap={1}>
          <Typography variant="h1">Register as a Lawyer</Typography>
          <Typography>Please enter the details below to complete registration</Typography>
        </Stack> */}
      </Grid2>
    </Grid2>
  )
}

LawyerRegister.rootLayoutProps = {
  title: 'Lawyer Register',
  pageType: 'auth',
}

LawyerRegister.childLayout = (page) => <LawyerAuthLayout>{page}</LawyerAuthLayout>

export default LawyerRegister
