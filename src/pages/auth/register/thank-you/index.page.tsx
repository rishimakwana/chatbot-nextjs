import Link from 'next/link'
import { CiCircleCheck } from 'react-icons/ci'
import { Button, Card, Stack, Typography } from '@mui/material'

import Logo from '@/components/logo/Logo.component'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import { TPage } from '@/types'

const ThankYou: TPage = () => {
  return (
    <>
      <Stack alignItems={{ xs: 'center', md: 'start' }}>
        <Logo collapsed={false} />
      </Stack>
      <Stack alignItems="center" justifyContent="center" height="calc(100vh - 122px)" textAlign="center" spacing={4}>
        <Stack component={Card} variant="outlined" sx={{ width: '100%', maxWidth: 400 }} alignItems="center" gap={2} p={4}>
          {/* Icon */}
          <Stack component={CiCircleCheck} size={62} sx={{ color: 'green' }} />

          {/* Header */}
          <Stack spacing={1.5}>
            <Typography variant="display2">Congratulations</Typography>
            <Typography>You have successfully created your account.</Typography>
          </Stack>

          {/* Action */}
          <Button variant="orange" href="/" size="large" component={Link} replace fullWidth>
            Continue
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

ThankYou.rootLayoutProps = {
  title: 'Account Created',
  pageType: 'protected',
  sidebar: false,
  header: false,
  footer: true,
}

ThankYou.childLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default ThankYou
