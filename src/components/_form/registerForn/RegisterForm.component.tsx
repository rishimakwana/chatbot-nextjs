import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Grid2, IconButton, Stack, Typography, Link as MuiLink, Button, FormControl, FormControlLabel, Checkbox } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import { useRegisterMutation } from '@/redux/api/auth.api'
import { setUser } from '@/utils'
import { useRouter } from 'next/router'
import { schema, TSchema } from './RegisterForm.config'
import Link from 'next/link'

const RegisterForm = () => {
  const [register] = useRegisterMutation()
  const router = useRouter()
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    watch,
    formState: { isDirty, errors },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: TSchema) => {
    const { token } = await register(formData).unwrap()
    setUser({ token })
  }

  return (
    <Stack>
      <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* Heading */}
        <Grid2 size={12} mb={2}>
          <Stack gap={1}>
            <Typography variant="display1" textAlign={'center'} color="primary.main">
              Register
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
              Please enter the details below to complete registration
            </Typography>
          </Stack>
        </Grid2>

        <Grid2 size={12}>
          <Stack gap={2} justifyContent={'center'} direction={'row'}>
            {/* Full Name */}
            <InputField name="fullName" type="text" label="Full Name*" control={control} />
            {/* Email */}
            <InputField name="email" type="email" label="Email ID *" control={control} />
          </Stack>
        </Grid2>

        {/* <Grid2 size={12}></Grid2> */}

        {/* Password */}
        <Grid2 size={12}>
          <Stack gap={2}>
            <InputField
              name="password"
              label="Enter New Password *"
              type={showPassword ? 'text' : 'password'}
              control={control}
              slotProps={{
                input: {
                  endAdornment: <IconButton onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
                  autoComplete: 'new-password',
                },
                formHelperText: {
                  sx: { display: errors.password?.type === 'validate' ? 'none' : undefined },
                },
              }}
            />
            <Typography variant="body2" color={errors.password?.type === 'validate' ? 'error.dark' : 'text.secondary'}>
              Password must have minimum 8 characters, with at least 1 upper case letter, 1 lower case letter, 1 numeric and 1 special character.
            </Typography>
          </Stack>
        </Grid2>

        {/* Confirm Password */}
        <Grid2 size={12}>
          <InputField
            name="confirmPassword"
            label="Confirm New Password *"
            type={showConfirmPassword ? 'text' : 'password'}
            control={control}
            slotProps={{
              input: {
                endAdornment: <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>{showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
                autoComplete: 'new-password',
              },
            }}
          />
        </Grid2>

        {/* Accept  */}
        <Grid2>
          <Controller
            name="termsAccepted"
            control={control}
            defaultValue={false}
            render={({ fieldState: { error }, field: { ref, value, ...restField } }) => (
              <FormControl error={!!error}>
                <FormControlLabel
                  label={
                    <>
                      <Typography variant="body2" color="primary.main">
                        I’ve read and accept the{' '}
                        <MuiLink component={Link} href="https://www.synsoftglobal.com/privacy/" target="_blank">
                          Terms & Conditions and Privacy Policy
                        </MuiLink>
                      </Typography>
                      <Typography variant="body2" color="primary.main">
                        Please agree to the Terms and Policies before you submit registration.
                      </Typography>
                    </>
                  }
                  slotProps={{ typography: { sx: { '&, *,': { color: error ? 'error.dark' : undefined, textDecorationColor: 'unset' } } } }}
                  control={<Checkbox {...restField} inputRef={ref} checked={value} sx={{ '&[class]': { color: error ? 'error.dark' : undefined } }} />}
                />
              </FormControl>
            )}
          />
        </Grid2>

        {/* Forgot Password */}
        <Grid2 size={12}>
          <Stack alignItems="end">
            <MuiLink href="#">Forgot Password?</MuiLink>
          </Stack>
        </Grid2>

        {/* Submit */}
        <Grid2 size={12} mt={1}>
          <Button fullWidth variant="orange" type="submit" size="large" loading={isSubmitting}>
            Register
          </Button>
        </Grid2>
      </Grid2>
    </Stack>
  )
}

export default RegisterForm
