import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

import { Layout } from '@/components/Layout'

const FeedbackConfirmation = () => {
  const { t } = useTranslation('common')

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-6">
          <h1 className="govuk-panel__title">{t('feedback.confirmation.title')}</h1>
          <div className="govuk-panel__body">{t('feedback.confirmation.subtitle')}</div>
        </div>
        <Trans i18nKey="feedback.confirmation.message">
          <p></p>
          <p>
            <a className="govuk-link--no-visited-state" href="mailto:researchteam.dpd@ukhsa.gov.uk"></a>
          </p>
        </Trans>
        <Link href="/" className="govuk-link--no-visited-state govuk-!-margin-top-2 govuk-body inline-block">
          {t('returnToHomeBtn')}
        </Link>
      </div>
    </div>
  )
}

export default FeedbackConfirmation

FeedbackConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async (req) => {
  return {
    props: {
      ...(await serverSideTranslations(req.locale as string, ['common', 'errors'])),
    },
  }
}
