import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Grid2, Typography, IconButton } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import { schema, TSchema } from './ResetPassword.config'
import { TPage } from '@/types'
import { useResetPasswordMutation } from '@/redux/api/auth.api'
import LawyerAuthLayout from '@/layouts/lawyerAuthLayout/LawyerAuthLayout.component'

const ResetPassword: TPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetPassword] = useResetPasswordMutation()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('token', router.query.token as string)
  }, [router.isReady])

  const onSubmit = async (formData: TSchema) => {
    await resetPassword(formData).unwrap()
    router.replace('/auth/login')
  }

  return (
    <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* Heading */}
      <Grid2 size={12} mb={1}>
        <Typography variant="h1">Reset your password</Typography>
      </Grid2>

      {/* Password */}
      <Grid2 size={12}>
        <InputField
          name="password"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          control={control}
          slotProps={{
            input: {
              endAdornment: <IconButton onClick={() => setShowPassword((v) => !v)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
            },
          }}
        />
      </Grid2>

      {/* Confirm Password */}
      <Grid2 size={12}>
        <InputField
          name="confirmPassword"
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          control={control}
          slotProps={{
            input: {
              endAdornment: <IconButton onClick={() => setShowConfirmPassword((v) => !v)}>{showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
            },
          }}
        />
      </Grid2>

      {/* Submit */}
      <Grid2 size={12} mt={1}>
        <LoadingButton variant="gradient" type="submit" size="large" loading={isSubmitting} sx={{ width: { xs: 1, sm: 'auto' } }}>
          Reset Password
        </LoadingButton>
      </Grid2>
    </Grid2>
  )
}

ResetPassword.rootLayoutProps = {
  title: 'Reset Password',
  pageType: 'auth',
}

ResetPassword.childLayout = (page) => <LawyerAuthLayout>{page}</LawyerAuthLayout>

export default ResetPassword
