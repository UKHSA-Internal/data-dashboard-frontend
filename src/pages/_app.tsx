import '../styles/globals.scss'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { ComponentType, ReactElement, ReactNode } from 'react'

import { initMocks } from '@/api/msw'
import { GlobalStyle } from '@/components/GlobalStyle'
import { Layout } from '@/components/Layout'
import StoreProvider from '@/lib/StoreProvider'

import nextI18NextConfig from '../../next-i18next.config'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  initMocks()
}

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout scrollToTop>{page}</Layout>)

  return getLayout(
    <StoreProvider {...pageProps.initialZustandState}>
      <GlobalStyle />
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default appWithTranslation(App as ComponentType<AppProps>, nextI18NextConfig)
