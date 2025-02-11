import Link from 'next/link'
import { LoadingButton } from '@mui/lab'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Grid2, Stack, Typography, Link as MuiLink } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import { schema, TSchema, defaultValues } from './ForgotPassword.config'
import { TPage } from '@/types'
import { useForgotPasswordMutation } from '@/redux/api/auth.api'
import { useEffect } from 'react'
import LawyerAuthLayout from '@/layouts/lawyerAuthLayout/LawyerAuthLayout.component'

const ForgotPassword: TPage = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
    defaultValues,
  })

  useEffect(() => {
    if (isSubmitSuccessful) reset()
  }, [isSubmitSuccessful])

  const onSubmit = async (formData: TSchema) => {
    await forgotPassword(formData).unwrap()
  }

  return (
    <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* Heading */}
      <Grid2 size={12} mb={1}>
        <Stack gap={1}>
          <Typography variant="h1">Forgot your password?</Typography>
          <Typography>No worries, we'll send you a reset link on your email.</Typography>
        </Stack>
      </Grid2>

      {/* Email */}
      <Grid2 size={12}>
        <InputField name="email" type="email" label="Email *" control={control} />
      </Grid2>

      {/* Submit */}
      <Grid2 size={12} mt={1}>
        <LoadingButton  type="submit" size="large" loading={isSubmitting} sx={{ width: { xs: 1, sm: 'auto' } }}>
          Send
        </LoadingButton>
      </Grid2>

      {/* Back */}
      <Grid2 size={12} mt={1}>
        <Stack direction="row" gap={1}>
          <Typography>Back to</Typography>
          {/* <MuiLink component={Link} href="/auth/login">
            Sign In
          </MuiLink> */}
        </Stack>
      </Grid2>
    </Grid2>
  )
}

ForgotPassword.rootLayoutProps = {
  title: 'Forgot Password',
  pageType: 'auth',
}

ForgotPassword.childLayout = (page) => <LawyerAuthLayout>{page}</LawyerAuthLayout>

export default ForgotPassword
