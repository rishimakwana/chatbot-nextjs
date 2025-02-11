import Head from 'next/head'
import { Stack } from '@mui/material'

import Header from '../../components/header/Header.component'
import Sidebar from './components/sidebar/Sidebar.component'
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary.component'
import FullPageLoader from '@/components/fullPageLoader/FullPageLoader.component'
import FullPageMessage from '@/components/fullPageMessage/FullPageMessage.component'
import Alerts from './components/alerts/Alerts.compoent'
import { RootLayoutProps } from './RootLayout.type'
import { useAuth } from './RootLayout.hook'
import { usePage, useReduxSelector } from '@/hooks'
import { makeStyle } from './RootLayout.style'
import Footer from './components/footer/Footer.component'

export default function RootLayout(props: RootLayoutProps & { children: React.ReactNode }) {
  let { children, title, header, sidebar, footer } = props
  const { isLoading, isError, isPermission } = useAuth(props)
  const { isAuthPage, isDashboard } = usePage()
  const { fullPageLoader } = useReduxSelector((state) => state.layout)
  const style = makeStyle({ isDashboard })

  if (isAuthPage) header = false
  // if (!isDashboard) sidebar = false

  const renderChildren = () => {
    if (!isPermission) return <FullPageMessage heading="404: Page Not Found" hideButton />
    return children
  }

  return (
    <>
      <Head>{title && <title>{`${title} | Docbot`}</title>}</Head>

      {isLoading || fullPageLoader ? (
        <FullPageLoader />
      ) : (
        <>
          <Stack direction="row">
            {sidebar !== false && !isError && <Sidebar />}
            <Stack sx={style.body}>
              {/* {header !== false && <Header />} */}
              <Stack component="main" sx={style.main}>
                <ErrorBoundary error={isError}>
                  <Alerts />
                  {renderChildren()}
                </ErrorBoundary>
              </Stack>
              {footer !== false && <Footer />}
            </Stack>
          </Stack>
        </>
      )}
    </>
  )
}
