import { Roboto } from 'next/font/google'

const font = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

import './globals.scss'

import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

import { AWSRum } from '@/app/components/ui/ukhsa/Scripts/AWSRum/AWSRum'
import { getServerTranslation } from '@/app/i18n'

import { Footer } from './components/ui/govuk'
import { HealthAlertsMapWrapper } from './components/ui/ukhsa/Map/health-alerts/HealthAlertsMapWrapper'
import { GoogleTagManager } from './components/ui/ukhsa/Scripts/GoogleTagManager/GoogleTagManager'
import { GovUK } from './components/ui/ukhsa/Scripts/GovUK/GovUK'
import { UKHSA_GDPR_COOKIE_NAME } from './constants/cookies.constants'
import { Providers } from './providers'

// export const dynamic = authEnabled ? 'auto' : 'force-dynamic'

const DynamicCookieBanner = dynamic(() => import('./components/ui/ukhsa').then((mod) => mod.CookieBanner), {
  ssr: true,
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { t } = await getServerTranslation('common')

  const cookieStore = cookies()

  return (
    <html lang="en" className={`govuk-template ${font.variable} font-sans`}>
      <body className="govuk-template__body">
        <GoogleTagManager />
        <GovUK />
        <AWSRum applicationId={process.env.RUM_APPLICATION_ID} identityPoolId={process.env.RUM_IDENTITY_POOL_ID} />

        <a href="#main-content" className="govuk-skip-link" data-module="govuk-skip-link">
          {t('skipLink')}
        </a>
        <Suspense fallback={null}>
          <DynamicCookieBanner
            cookie={cookieStore.get(UKHSA_GDPR_COOKIE_NAME)?.value}
            title={t('cookieBanner.title')}
            body={<Trans i18nKey="cookieBanner.body" t={t} components={[<p key={0} />, <p key={1} />]} />}
          />
        </Suspense>

        <Providers>
          {children}
          <HealthAlertsMapWrapper />
        </Providers>

        <Footer />
      </body>
    </html>
  )
}
