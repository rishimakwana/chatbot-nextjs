import Link from 'next/link'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Grid2, IconButton, Stack, Typography, Link as MuiLink } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import RecaptchaField from '@/components/_ui/recaptchaField/RecaptchaField.component'

import { schema, TSchema } from './LoginForm.config'
import { useLoginMutation } from '@/redux/api/auth.api'
import { setUser } from '@/utils'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [login] = useLoginMutation()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: TSchema) => {
    const { token } = await login(formData).unwrap()
    setUser({ token })
  }

  return (
    <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* Heading */}
      <Grid2 size={12} mb={1}>
        <Typography variant="h1">Login</Typography>
      </Grid2>

      {/* Email */}
      <Grid2 size={12}>
        <InputField name="email" type="email" label="Email *" control={control} />
      </Grid2>

      {/* Password */}
      <Grid2 size={12}>
        <InputField
          name="password"
          label="Password *"
          type={showPassword ? 'text' : 'password'}
          control={control}
          slotProps={{
            input: {
              endAdornment: <IconButton onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
            },
          }}
        />
      </Grid2>

      {/* Forgot Password */}
      <Grid2 size={12}>
        <Stack alignItems="end">
          <MuiLink component={Link} href="/auth/forgot-password">
            Forgot your password?
          </MuiLink>
        </Stack>
      </Grid2>

      {/* Recaptcha */}
      <Grid2 size={12}>
        <RecaptchaField name="recaptchaToken" control={control} />
      </Grid2>

      {/* Submit */}
      <Grid2 size={12} mt={1}>
        <LoadingButton variant="contained" type="submit" size="large" loading={isSubmitting} sx={{ width: { xs: 1, sm: 'auto' } }}>
          Login
        </LoadingButton>
      </Grid2>

      <Grid2 size={12} mt={1}>
        <Stack gap={1} alignItems="start">
          {/* Register */}
          <Stack direction="row" gap={1}>
            <Typography>Are You a New User?</Typography>
            {/* <MuiLink component={Link} href="/auth/register">
              Register
            </MuiLink> */}
          </Stack>
        </Stack>
      </Grid2>
    </Grid2>
  )
}
