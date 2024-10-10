import { Roboto } from 'next/font/google'

const font = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

import './globals.scss'

import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { Trans } from 'react-i18next/TransWithoutContext'

import { getServerTranslation } from '@/app/i18n'

import { Footer } from './components/ui/govuk'
import { CookieBanner } from './components/ui/ukhsa'
import { HealthAlertsMapWrapper } from './components/ui/ukhsa/Map/health-alerts/HealthAlertsMapWrapper'
import { GoogleTagManager } from './components/ui/ukhsa/Scripts/GoogleTagManager/GoogleTagManager'
import { GovUK } from './components/ui/ukhsa/Scripts/GovUK/GovUK'
import { UKHSA_GDPR_COOKIE_NAME } from './constants/cookies.constants'
import { Providers } from './providers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { t } = await getServerTranslation('common')

  const cookieStore = cookies()

  return (
    <html lang="en" className={`govuk-template ${font.variable} font-sans`}>
      <body className="govuk-template__body">
        <GoogleTagManager />
        <GovUK />

        <a href="#main-content" className="govuk-skip-link" data-module="govuk-skip-link">
          {t('skipLink')}
        </a>
        <Suspense fallback={null}>
          <CookieBanner
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
