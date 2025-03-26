import { TPage } from '@/types'
import AuthLayout from '@/layouts/authLayout/AuthLayout.component'
import SubscriptionPage from './components/SubscriptionPage.component'

const Subscription: TPage = () => {
  return <SubscriptionPage />
}

Subscription.rootLayoutProps = {
  title: 'Subscription',
  pageType: 'auth',
  sidebar: false,
  header: false,
  footer: true,
}

Subscription.childLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default Subscription
