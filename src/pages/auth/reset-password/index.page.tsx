import ResetPasswordForm from '@/components/_form/resetPasswordForm/ResetPasswordForm.component'
import AuthPage from '@/components/auth/AuthPage.component'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import { TPage } from '@/types'

const ResetPassword: TPage = () => <AuthPage FormComponent={ResetPasswordForm} />

ResetPassword.rootLayoutProps = {
  title: 'Reset Password',
  pageType: 'auth',
  sidebar: false,
  header: false,
  footer: false,
}

ResetPassword.childLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default ResetPassword
