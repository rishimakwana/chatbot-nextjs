import AuthPage from '@/components/auth/AuthPage.component'
import RegisterForm from '@/components/_form/registerForn/RegisterForm.component'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import { TPage } from '@/types'

const Register: TPage = () => <AuthPage FormComponent={RegisterForm} />

Register.rootLayoutProps = {
  title: 'Register',
  pageType: 'auth',
  sidebar: false,
  header: false,
  footer: true,
}

Register.childLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default Register
