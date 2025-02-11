import { ReactElement, ReactNode } from 'react'
import { NextPage as NextPageType } from 'next'
import { AppProps as AppPropsType } from 'next/app'

import { RootLayoutProps } from '@/layouts/rootLayout/RootLayout.type'

export type AppProps = AppPropsType & { Component: NextPage }

type NextPage<P = {}, IP = P> = NextPageType<P, IP> & {
  rootLayoutProps: RootLayoutProps
  childLayout?: (page: ReactElement) => ReactNode
}
