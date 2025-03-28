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
    getValues,
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
      const updatedEmail = getValues('email')
      await resendOtp({ email: updatedEmail }).unwrap()
      setResendTimer(30)
    } catch (err) {}
  }

  const onSubmit = async (formData: TSchema) => {
    await verifyOtp(formData).unwrap()
    dispatch(updateUser({ ...userData, verified: true }))
    router.replace('/auth/register/thank-you')
  }

  return (
    <Stack height={'calc(100vh - 106px)'} justifyContent={'center'}>
      <Stack alignItems={'center'} justifyContent={'center'} maxWidth={'400px'} mx={'auto'} flex={1}>
        <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* Heading */}
          <Grid2 size={12}>
            <Stack gap={1}>
              <Typography variant="display1" textAlign={'center'} color="primary.main">
                Verification
              </Typography>
              <Typography variant="body2" textAlign={'center'} px={{ xs: 0, sm: 3 }}>
                We've sent the verification OTP on your email , please enter the OTP here to create your account.
              </Typography>
            </Stack>
          </Grid2>

          {/* OTP */}
          <Grid2 size={12} my={2}>
            <OtpField name="otp" control={control} />
          </Grid2>

          <Grid2 size={12} mt={1}>
            <Button fullWidth variant="orange" type="submit" size="large" loading={isSubmitting}>
              Verify
            </Button>
          </Grid2>

          {/* Resend */}
          <Grid2 size={12}>
            <Stack direction="row" gap={1} justifyContent="center">
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
      </Stack>
    </Stack>
  )
}
