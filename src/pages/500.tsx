import { GridCol, GridRow } from 'govuk-react'
import { GetStaticProps } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

import { Layout } from '@/components/Layout'
import { Page } from '@/components/Page'

export default function PageNotFound() {
  const { t } = useTranslation('errors')
  return (
    <Page heading={t('serviceProblem.heading')} seoTitle={t('serviceProblem.heading')} seoDescription="">
      <GridRow>
        <GridCol setDesktopWidth="two-thirds">
          <Trans t={t} i18nKey="serviceProblem.body">
            <p>Try again later.</p>
            <p>
              <a href="https://www.gov.uk/government/collections/contacts-public-health-england-regions-local-centres-and-emergency">
                Contact the UK Health Security Agency (UKHSA)
              </a>
              <span>if you need to speak to someone.</span>
            </p>
          </Trans>
        </GridCol>
      </GridRow>
    </Page>
  )
}

PageNotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async (req) => {
  return {
    props: {
      ...(await serverSideTranslations(req.locale as string, ['common', 'errors'])),
    },
  }
}
