import Link from 'next/link'
import { Button } from '@mui/material'

import FullPageMessage from '@/components/fullPageMessage/FullPageMessage.component'
import { TPage } from '@/types'

const PageNotFound: TPage = () => {
  return (
    <FullPageMessage
      heading="404: Page Not Found"
      ActionButton={
        <Button variant="contained" href="/" component={Link}>
          Go to Home
        </Button>
      }
    />
  )
}

PageNotFound.rootLayoutProps = {
  title: 'Page not found',
  pageType: 'public',
}

export default PageNotFound
