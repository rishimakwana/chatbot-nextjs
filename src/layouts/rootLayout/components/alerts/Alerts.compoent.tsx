import Link from 'next/link'
import { Alert, Container, Link as MuiLink } from '@mui/material'
import { useRouter } from 'next/router'

import { style } from './Alerts.style'
import { useReduxSelector } from '@/hooks'

export default function Alerts() {
  const router = useRouter()
  const { userData, role } = useReduxSelector((state) => state.user)

  return (
    <Container sx={style.root}>
      {/* Payment Failed Alert */}
      {role === 'client' && userData.subscriptionStatus === 'failed' && router.pathname !== '/dashboard/billing' && (
        <Alert
          severity="error"
          variant="outlined"
          action={
            <MuiLink color="error" variant="body1" href="/dashboard/billing" component={Link} sx={style.billingBtn}>
              Check Billing
            </MuiLink>
          }
          sx={style.billingAlert}
        >
          Last subscription automatic payment failed
        </Alert>
      )}
    </Container>
  )
}
