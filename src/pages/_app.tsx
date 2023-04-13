import { appWithTranslation } from 'next-i18next'
import { GlobalStyle } from '@/components/GlobalStyle'
import { Layout } from '@/components/Layout'
import type { AppProps } from 'next/app'
import { initMocks } from '@/api/msw'
import nextI18NextConfig from '../../next-i18next.config'

import '../styles/globals.css'
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  initMocks()
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
        <ScrollToTop />
      </Layout>
    </>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
