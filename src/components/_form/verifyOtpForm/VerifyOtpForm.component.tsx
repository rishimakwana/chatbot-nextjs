import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid2, Stack, Typography, Link as MuiLink, CircularProgress, Button } from '@mui/material'

import OtpField from '../otpField/OtpField.component'
import { updateUser } from '@/redux/slice/user.slice'
import { schema, TSchema } from './VerifyOtpForm.config'
import { VerifyOtpFormProps } from './VerifyOtpForm.type'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { useResendOtpMutation, useVerifyOtpMutation } from '@/redux/api/auth.api'

export default function VerifyOtpForm({ data }: VerifyOtpFormProps) {
  const router = useRouter()
  const dispatch = useReduxDispatch()
  const [resendTimer, setResendTimer] = useState(0)
  const isResendDisabled = resendTimer > 0

  const [verifyOtp] = useVerifyOtpMutation()
  const [resendOtp, resendOtpApiState] = useResendOtpMutation()
  const { userData } = useReduxSelector((state) => state.user)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
      email: userData?.email || '',
    },
  })

  useEffect(() => {
    if (userData?.email) {
      setValue('email', userData.email)
    }
  }, [userData])

  useEffect(() => {
    if (resendTimer <= 0) return
    const intervalId = setInterval(() => setResendTimer((prev) => prev - 1), 1000)
    return () => clearInterval(intervalId)
  }, [resendTimer])

  const handleResend = async () => {
    try {
      if (resendTimer > 0) return
      await resendOtp({ email: data.email }).unwrap()
      setResendTimer(30)
    } catch (err) {}
  }

  const onSubmit = async (formData: TSchema) => {
    await verifyOtp(formData).unwrap()
    dispatch(updateUser({ ...userData, verified: true }))
    router.replace('/auth/register/thank-you')
  }

  return (
    <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* Heading */}
      <Grid2 size={12}>
        <Stack gap={1}>
          <Typography variant="display1" textAlign={'center'} color="primary.main">
            Verification
          </Typography>
          <Typography variant="body2" textAlign={'center'}>
            We've sent the verification OTP on your email , please enter the OTP here to create your account.
          </Typography>
        </Stack>
      </Grid2>

      {/* OTP */}
      <Grid2 size={12} my={2} display="flex" justifyContent="center" alignItems="center">
        <OtpField name="otp" control={control} />
      </Grid2>

      <Grid2 size={12} mt={1}>
        <Button fullWidth variant="orange" type="submit" size="large" loading={isSubmitting}>
          Verify
        </Button>
      </Grid2>

      {/* Resend */}
      <Grid2 size={12}>
        <Stack direction="row" gap={1}>
          <Typography>Didn't receive the OTP?</Typography>
          {resendOtpApiState.isLoading ? (
            <CircularProgress size={18} />
          ) : (
            <MuiLink onClick={handleResend} underline={isResendDisabled ? 'none' : 'always'} sx={isResendDisabled ? { cursor: 'not-allowed', pointerEvents: 'none', color: 'text.disabled' } : {}}>
              {isResendDisabled ? `Resend in ${resendTimer}s` : 'Resend'}
            </MuiLink>
          )}
        </Stack>
      </Grid2>
    </Grid2>
  )
}
