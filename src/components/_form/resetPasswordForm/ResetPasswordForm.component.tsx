import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid2, Stack, Typography, Button, Link as MuiLink, IconButton } from '@mui/material'

import { useResetPasswordMutation } from '@/redux/api/auth.api'
import InputField from '@/components/_ui/inputField/InputField.component'
import { schema, TSchema } from './ResetPasswordForm.config'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

const ResetPasswordForm = () => {
  const router = useRouter()
  const [resetPassword] = useResetPasswordMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('token', router.query.token as string)
  }, [router.isReady])

  const onSubmit = async (formData: TSchema) => {
    await resetPassword({ newPassword: formData.password, token: formData.token }).unwrap()
    router.replace('/auth/login')
  }

  return (
    <Stack height={'calc(100vh - 90px)'} justifyContent={'center'}>
      <Stack alignItems={'center'} justifyContent={'center'} maxWidth={'600px'} mx={'auto'} flex={1}>
        <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* Heading */}
          <Grid2 size={12} mb={2}>
            <Stack gap={1}>
              <Typography variant="display1" textAlign={'center'} color="primary.main">
                Reset Your Password
              </Typography>
              <Typography variant="body1" textAlign={'center'}>
                Password must have minimum 8 characters, with at least 1 upper case letter, 1 lower case letter, 1 numeric and 1 special character.
              </Typography>
            </Stack>
          </Grid2>

          {/* Password */}
          <Grid2 size={12}>
            <Typography variant="body1">New Password*</Typography>
            <InputField
              name="password"
              placeholder="Please enter your Password."
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
            <Typography variant="body1">Confirm New Password</Typography>
            <InputField
              name="confirmPassword"
              placeholder="Please confirm your Password."
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
            <Button fullWidth variant="orange" type="submit" size="large" loading={isSubmitting}>
              Send
            </Button>
          </Grid2>

          <Grid2 size={12} mt={1} textAlign={'center'}>
            <MuiLink href="/auth/login">Back to login</MuiLink>
          </Grid2>
        </Grid2>
      </Stack>
    </Stack>
  )
}

export default ResetPasswordForm
