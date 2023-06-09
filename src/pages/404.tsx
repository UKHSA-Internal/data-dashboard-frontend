import { ReactElement } from 'react'
import { Page } from '@/components/Page'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation, Trans } from 'next-i18next'
import { GridCol, GridRow } from 'govuk-react'
import { Layout } from '@/components/Layout'

export default function PageNotFound() {
  const { t } = useTranslation('errors')
  return (
    <Page heading={t('pageNotFound.heading')} seoTitle={t('pageNotFound.heading')} seoDescription="">
      <GridRow>
        <GridCol setDesktopWidth="two-thirds">
          <Trans t={t} i18nKey="pageNotFound.body">
            <p>If you typed the web address, check it is correct.</p>
            <p>If you pasted the web address, check you copied the entire address.</p>
            <p>
              <span>If the web address is correct or you selected a link or button, </span>
              <a href="https://www.gov.uk/government/collections/contacts-public-health-england-regions-local-centres-and-emergency">
                contact the UK Health Security Agency (UKHSA)
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
