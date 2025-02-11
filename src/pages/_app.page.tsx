import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Provider } from 'react-redux'
import { IconContext } from 'react-icons/lib'

import RootLayout from '@/layouts/rootLayout/RootLayout.component'
import NProgress from '@/components/nProgress/NProgress.component'
import ReactHotToast from '@/components/reactHotToast/ReactHotToast.component'
import { store } from '@/redux/store/store'
import { theme } from '@/styles/theme'
import { AppProps } from './_app.type'
import '@/styles/globals.css'
import '@/lib/moment'
import '@/lib/yup'

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const rootLayoutProps = Component.rootLayoutProps
  const childLayout = Component.childLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>DocBot</title>
        <meta charSet="UTF-8" />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <IconContext.Provider value={{ className: 'icon' }}>
              <ReactHotToast />
              <NProgress />
              <CssBaseline enableColorScheme />
              <RootLayout {...rootLayoutProps}><Component {...pageProps} /></RootLayout>
            </IconContext.Provider>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </>
  )
}
