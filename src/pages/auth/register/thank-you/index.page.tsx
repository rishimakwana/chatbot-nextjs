import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { HiCheckCircle } from 'react-icons/hi2'
import { Button, Stack, Typography } from '@mui/material'

import { TPage } from '@/types'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'

const ThankYou: TPage = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer) // Cleanup in case the component unmounts
  }, [router])
  return (
    <Stack alignItems="center" justifyContent="center" height="calc(100vh - 50px)" textAlign="center" spacing={4}>
      {/* Icon */}
      <HiCheckCircle size={62} style={{ color: 'var(--mui-palette-primary-main)' }} />

      {/* Header */}
      <Stack spacing={1.5}>
        <Typography variant="display2">Congratulations</Typography>
        <Typography>You have successfully created your account.</Typography>
      </Stack>

      {/* Action */}
      <Button variant="orange" href="/" size="large" component={Link} replace>
        Continue
      </Button>
    </Stack>
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
