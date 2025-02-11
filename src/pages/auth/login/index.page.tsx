import LoginForm from '@/components/_form/loginForm/LoginForm.component'
import LawyerAuthLayout from '@/layouts/lawyerAuthLayout/LawyerAuthLayout.component'
import { TPage } from '@/types'

const Login: TPage = () => {
  return <LoginForm />
}

Login.rootLayoutProps = {
  title: 'Login',
  pageType: 'auth',
}

Login.childLayout = (page) => <LawyerAuthLayout>{page}</LawyerAuthLayout>

export default Login
