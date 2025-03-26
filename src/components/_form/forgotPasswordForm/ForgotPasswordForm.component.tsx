import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid2, Stack, Typography, Button, Link as MuiLink } from '@mui/material'

import { schema, TSchema } from './ForgotPasswordForm.config'
import { useForgotPasswordMutation } from '@/redux/api/auth.api'
import InputField from '@/components/_ui/inputField/InputField.component'

const ForgotPasswordForm = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formData: TSchema) => {
    await forgotPassword(formData).unwrap()
  }

  return (
    <Stack gap={2}>
      <Grid2 container component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        {/* Heading */}
        <Grid2 size={12} mb={2}>
          <Stack gap={1}>
            <Typography variant="display1" textAlign={'center'} color="primary.main">
              Forgot Password?
            </Typography>
            <Typography variant="body1" textAlign={'center'}>
              Please enter your registered email id.
            </Typography>
          </Stack>
        </Grid2>

        {/* Email */}
        <Grid2 size={12}>
          <InputField name="email" type="email" label="Email ID *" control={control} />
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
  )
}

export default ForgotPasswordForm
