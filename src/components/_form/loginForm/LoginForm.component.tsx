import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Grid2, IconButton, Stack, Typography, Link as MuiLink, Button } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import RecaptchaField from '@/components/_ui/recaptchaField/RecaptchaField.component'
import { useLoginMutation } from '@/redux/api/auth.api'
import { setUser } from '@/utils'
import { useRouter } from 'next/router'
import { schema, TSchema } from './LoginForm.config'
import Link from 'next/link'
import Footer from '@/layouts/rootLayout/components/footer/Footer.component'

const LoginForm = () => {
  const [login] = useLoginMutation()
  const [showPassword, setShowPassword] = useState<boolean>(false)

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
    <>
      <Stack>
        <Grid2 spacing={3} container component="form" noValidate onSubmit={handleSubmit(onSubmit)} >
          {/* Heading */}
          <Grid2 size={12} mb={2}>
            <Typography variant="display1" textAlign={'center'} color="primary.main">
              Login
            </Typography>
          </Grid2>

          {/* Email */}
          <Grid2 size={12}>
            <Typography mb={1} variant="body1">Email ID</Typography>
            <InputField name="email" type="email" placeholder="abc@example.com" control={control} />
          </Grid2>

          {/* Password */}
          <Grid2 size={12}>
            <Stack justifyContent={'space-between'} direction={'row'}>
              <Typography mb={1} variant="body1">Passwrod</Typography>
              {/* Forgot Password */}
              <MuiLink href="/auth/forgot-password" sx={{ textDecoration: 'none' }}>
                Forgot Password?
              </MuiLink>
            </Stack>
            <InputField
              name="password"
              type={showPassword ? 'text' : 'password'}
              control={control}
              placeholder="Please enter your Password"
              slotProps={{
                input: {
                  endAdornment: <IconButton onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
                },
              }}
            />
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
            <Typography variant="body2" color="primary.main" mt={2} textAlign={'center'}>
              Are You a New User? <Link href="/auth/register" style={{fontWeight:600}}>Register</Link>
            </Typography>
          </Grid2>
        </Grid2>
      </Stack>
      <Footer />
    </>
  )
}

export default LoginForm
