'use client'
import { Roboto } from 'next/font/google'

const font = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-primary' })

import '@/app/globals.scss'

import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import Error from './(pages)/error/page'
import { Footer } from './components/ui/govuk/Footer/Footer'
import { GovukHeader } from './components/ui/ukhsa/GovukHeader/GovukHeader'
import { useTranslation } from './i18n/client'

export default function GlobalError({ error }: { error: Error }) {
  console.error('Global error page: ', error)
  const { t } = useTranslation('common')

  return (
    <html lang="en" className={`govuk-template ${font.variable} font-sans`}>
      <body className="govuk-template__body">
        <GovukHeader serviceTitle={t('serviceTitle')} />

        <div className="govuk-width-container print:hidden">
          <div className="govuk-phase-banner" data-testid="ukhsa-phase-banner">
            <p className="govuk-phase-banner__content">
              <strong className="govuk-tag govuk-phase-banner__content__tag">{t('feedbackBannerPhase')}</strong>
              <Trans i18nKey="feedbackBanner" t={t}>
                <span className="govuk-phase-banner__text">
                  <Link className="govuk-link govuk-link--no-visited-state" href="/feedback" />
                </span>
              </Trans>
            </p>
          </div>
        </div>

        <div className="govuk-width-container govuk-!-margin-top-5">
          <Error />
        </div>

        <Footer />
      </body>
    </html>
  )
}
