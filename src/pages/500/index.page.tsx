import FullPageMessage from '@/components/fullPageMessage/FullPageMessage.component'
import { TPage } from '@/types'

const ServerError: TPage = () => {
  return <FullPageMessage heading="500: Server-side error occurred" />
}

ServerError.rootLayoutProps = {
  title: 'Server-side error occurred',
  pageType: 'public',
}

export default ServerError
