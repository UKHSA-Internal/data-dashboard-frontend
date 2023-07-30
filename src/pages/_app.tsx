import '../styles/globals.scss'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

import { GlobalStyle } from '@/components/GlobalStyle'
import { Layout } from '@/components/Layout'

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
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
