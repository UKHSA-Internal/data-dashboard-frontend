import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion/Accordion'
import { Utils } from '@/components/CMS'
import { Contents, ContentsItem } from '@/components/Contents'
import { FormattedContent } from '@/components/FormattedContent'
import { Layout } from '@/components/Layout'
import { Page } from '@/components/Page'
import { RelatedLinks } from '@/components/RelatedLinks/RelatedLinks'
import { getStaticPropsRevalidateValue } from '@/config/app-utils'
import { logger } from '@/lib/logger'
import { initializeStore } from '@/lib/store'

type TopicPageProps = InferGetStaticPropsType<typeof getStaticProps>

const TopicPage = ({ title, body, description, accordion, lastUpdated, relatedLinks, meta }: TopicPageProps) => {
  const { t } = useTranslation('topic')

  if (!title) return null

  return (
    <Page
      heading={title}
      description={description}
      lastUpdated={lastUpdated}
      seoTitle={meta.seo_title}
      seoDescription={meta.search_description}
    >
      <Contents>
        {body.map(({ id, value }) => (
          <ContentsItem key={id} heading={value.heading}>
            {value.content.map(Utils.renderCard)}
          </ContentsItem>
        ))}
      </Contents>

      <Accordion containerProps={{ 'data-testid': 'virus-accordion' }}>
        {accordion.map(({ id, body }) => (
          <AccordionItem key={id}>
            <AccordionItemHeading>
              <AccordionItemButton>{t('accordion.heading', { context: id, defaultValue: '' })}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <FormattedContent>{body}</FormattedContent>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

export default TopicPage

TopicPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout backLink="/choose-topic">{page}</Layout>
}

export const getStaticProps = async (req: GetStaticPropsContext) => {
  try {
    const params = req.params

    // Check the slug exists in the url
    if (params && params.slug) {
      const {
        title,
        body,
        page_description: description,
        last_published_at: lastUpdated,
        related_links: relatedLinks = [],
        meta,
        ...rest
      } = await getPageBySlug(String(params.slug), PageType.Topic)

      const { charts, tabular } = await extractAndFetchPageData(body)

      const store = initializeStore({ charts, tabular })

      const accordion = [
        {
          id: 'symptoms',
          body: rest.symptoms ?? '',
        },
        {
          id: 'transmission',
          body: rest.transmission ?? '',
        },
        {
          id: 'treatment',
          body: rest.treatment ?? '',
        },
        {
          id: 'prevention',
          body: rest.prevention ?? '',
        },
        {
          id: 'surveillance_and_reporting',
          body: rest.surveillance_and_reporting ?? '',
        },
      ]

      // Parse the cms response and pick out only relevant data for the ui
      return {
        props: {
          title,
          body,
          description,
          accordion,
          lastUpdated,
          relatedLinks,
          meta,
          initialZustandState: JSON.parse(JSON.stringify(store.getState())),
          ...(await serverSideTranslations(req.locale as string, ['common', 'topic'])),
        },
        revalidate: getStaticPropsRevalidateValue(),
      }
    }

    throw new Error('No slug found')
  } catch (error) {
    logger.error(error)
    throw new Error(`Failed to fetch topic page: ${error}`)
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the CMS pages with a topic type
  const pages = await getPages(PageType.Topic)

  if (pages.success) {
    const { items } = pages.data

    // Get the paths we want to pre-render based on the list of topic pages
    const paths = items.map(({ meta: { slug } }) => ({
      params: { slug },
    }))

    return { paths, fallback: 'blocking' }
  }

  return { paths: [], fallback: true }
}
