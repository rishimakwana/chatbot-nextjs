import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Grid2, IconButton, Stack, Typography, Link as MuiLink, Button, Container, Fade } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import RecaptchaField from '@/components/_ui/recaptchaField/RecaptchaField.component'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import { useLoginMutation } from '@/redux/api/auth.api'
import { TPage } from '@/types'
import { setUser } from '@/utils'
import Logo from '@/components/logo/Logo.component'
import { useRouter } from 'next/router'
import { schema, TSchema } from './LoginForm.config'
import Link from 'next/link'

const LoginForm = () => {
  const [login] = useLoginMutation()
  const router = useRouter()
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: TSchema) => {
    const { token } = await login(formData).unwrap()
    setUser({ token })
  }

  return (
    <Stack>
      <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* Heading */}
        <Grid2 size={12} mb={2}>
          <Stack gap={1}>
            <Typography variant="display1" textAlign={'center'} color="primary.main">
              Login
            </Typography>
          </Stack>
        </Grid2>

        {/* Email */}
        <Grid2 size={12}>
          <InputField name="email" type="email" label="Email ID *" control={control} />
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
            <MuiLink href="/auth/forgot-password">Forgot Password?</MuiLink>
          </Stack>
        </Grid2>

        {/* Recaptcha */}
        <Grid2 size={12}>
          <RecaptchaField name="recaptchaToken" control={control} />
        </Grid2>

        {/* Submit */}
        <Grid2 size={12} mt={1}>
          <Button fullWidth variant="orange" type="submit" size="large" loading={isSubmitting}>
            Login
          </Button>
        </Grid2>

        <Stack>
          <Typography variant="body2" textAlign={'center'} color="primary.main">
            Are You a New User? <Link href="/auth/register">Register</Link>
          </Typography>
        </Stack>
      </Grid2>
    </Stack>
  )
}

export default LoginForm
