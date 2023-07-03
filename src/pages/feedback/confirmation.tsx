import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

import { Layout } from '@/components/Layout'

const FeedbackConfirmation = () => {
  const { t } = useTranslation('common')

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-panel govuk-panel--confirmation">
          <h1 className="govuk-panel__title">{t('feedbackConfirmationTitle')}</h1>
          <div className="govuk-panel__body">{t('feedbackConfirmationBody')}</div>
        </div>
        <Link href="/">{t('returnToHomeBtn')}</Link>
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
