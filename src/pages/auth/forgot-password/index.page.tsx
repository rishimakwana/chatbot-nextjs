import ForgotPasswordForm from '@/components/_form/forgotPasswordForm/ForgotPasswordForm.component'
import AuthPage from '@/components/auth/AuthPage.component'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import { TPage } from '@/types'

const ForgotPassword: TPage = () => <AuthPage FormComponent={ForgotPasswordForm} />

ForgotPassword.rootLayoutProps = {
  title: 'Forgot Password',
  pageType: 'auth',
  sidebar: false,
  header: false,
  footer: true,
}

ForgotPassword.childLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default ForgotPassword
