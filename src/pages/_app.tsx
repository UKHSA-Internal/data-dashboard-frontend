import Layout from '@/components/Layout/Layout'
import { GlobalStyle } from 'govuk-react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <GlobalStyle />
    </Layout>
  )
}
