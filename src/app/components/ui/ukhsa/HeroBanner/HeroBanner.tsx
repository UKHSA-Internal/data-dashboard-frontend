import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

import { getServerTranslation } from '@/app/i18n'

import { PhaseBanner } from '../PhaseBanner/PhaseBanner'

interface HeroBannerProps {
  subTitle: string
}

export default async function HeroBanner({ subTitle }: HeroBannerProps) {
  const { t } = await getServerTranslation('common')  as any;

  return (
    <div className="bg-blue">
      <div className="govuk-width-container govuk-!-padding-bottom-6 bg-blue" data-testid="ukhsa-hero-banner">
        <h1 className="govuk-heading-xl govuk-!-padding-top-7 govuk-!-margin-bottom-4 text-white">
          {t('heroBannerTitle')}
        </h1>
        <h2 className="govuk-heading-xl govuk-!-margin-bottom-3 text-offwhite">{subTitle}</h2>
        <Link className="govuk-body-s text-grey-4 focus:text-black" href="/about">
          {t('heroBannerAboutLink')}
        </Link>
      </div>

      <div className="govuk-width-container pb-2 print:hidden">
        <PhaseBanner tag={t('feedbackBannerPhase')} variant="light">
          <Trans i18nKey="feedbackBanner" t={t}>
            <span className="govuk-phase-banner__text">
              <Link className="govuk-link govuk-link--inverse" href="/feedback" />
            </span>
          </Trans>
        </PhaseBanner>
      </div>
    </div>
  )
}
