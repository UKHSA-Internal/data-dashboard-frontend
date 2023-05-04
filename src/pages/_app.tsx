import { appWithTranslation } from 'next-i18next'
import { GlobalStyle } from '@/components/GlobalStyle'
import { Layout } from '@/components/Layout'
import type { AppProps } from 'next/app'
import { initMocks } from '@/api/msw'
import nextI18NextConfig from '../../next-i18next.config'
import { ScrollToTop } from '@/components/ScrollToTop'
import StoreProvider from '@/lib/StoreProvider'

import '../styles/globals.css'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  initMocks()
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider {...pageProps.initialZustandState}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
        <ScrollToTop />
      </Layout>
    </StoreProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
