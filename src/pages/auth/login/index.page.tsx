import AuthPage from '@/components/auth/AuthPage.component'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import { TPage } from '@/types'
import LoginForm from '@/components/_form/loginForm/LoginForm.component'

const Login: TPage = () => <AuthPage FormComponent={LoginForm} />

Login.rootLayoutProps = {
  title: 'Login',
  pageType: 'auth',
  sidebar: false,
  header: false,
  footer: false,
}

Login.childLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default Login
