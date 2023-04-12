import { Paragraph } from 'govuk-react'
import { Page } from '@/components/Page'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

export default function PageNotFound() {
  const { t } = useTranslation('errors')
  return (
    <Page heading={t('pageNotFound.heading')}>
      <Paragraph>{t<string>('pageNotFound.body')}</Paragraph>
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async (req) => {
  return {
    props: {
      ...(await serverSideTranslations(req.locale as string, ['common', 'errors'])),
    },
  }
}
