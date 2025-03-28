import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid2, Stack, Typography, Button, Link as MuiLink } from '@mui/material'

import { schema, TSchema } from './ForgotPasswordForm.config'
import { useForgotPasswordMutation } from '@/redux/api/auth.api'
import InputField from '@/components/_ui/inputField/InputField.component'
import Footer from '@/layouts/rootLayout/components/footer/Footer.component'

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
    <Stack height={'calc(100vh - 90px)'} justifyContent={'center'} width={1}>
      <Stack alignItems={'center'} justifyContent={'center'} maxWidth={'600px'} mx={'auto'} flex={1}>
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
            <Typography variant="body1">Email ID</Typography>
            <InputField name="email" type="email" placeholder="abc@example.com" control={control} />
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
      <Footer />
    </Stack>
  )
}

export default ForgotPasswordForm
