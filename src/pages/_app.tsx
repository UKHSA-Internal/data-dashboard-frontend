import Layout from '@/components/Layout/Layout'
import { GlobalStyle } from 'govuk-react'
import type { AppProps } from 'next/app'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <GlobalStyle />
    </Layout>
  )
}
