import { GlobalStyle } from '@/components/GlobalStyle'
import { Layout } from '@/components/Layout'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../api/msw')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
