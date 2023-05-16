import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion/Accordion'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { initMocks } from '@/api/msw'
import { getPages, PageType } from '@/api/requests/cms/getPages'
import { Page } from '@/components/Page'
import { RelatedLinks } from '@/components/RelatedLinks/RelatedLinks'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { logger } from '@/lib/logger'
import { RelatedLinks as Links, Body } from '@/api/models/cms/Page'
import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { initializeStore } from '@/lib/store'
import { Contents, ContentsItem } from '@/components/Contents'
import { Utils } from '@/components/CMS'
import { FormattedContent } from '@/components/FormattedContent'
import { useTranslation } from 'next-i18next'

type TopicPageProps = InferGetStaticPropsType<typeof getStaticProps>

const TopicPage = ({ title, body, description, accordion, lastUpdated, relatedLinks }: TopicPageProps) => {
  const { t } = useTranslation('topic')

  if (!title) return null

  return (
    <Page heading={title} description={description} lastUpdated={lastUpdated}>
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
              <AccordionItemButton>{t('accordion.heading', { context: id })}</AccordionItemButton>
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

export const getStaticProps: GetStaticProps<{
  title: string
  body: Body
  description: string
  accordion: Array<{ id: string; body: string }>
  lastUpdated: string
  relatedLinks: Links
}> = async (req) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const revalidate = Number(process.env.NEXT_REVALIDATE_TIME)

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
        ...rest
      } = await getPageBySlug(String(params.slug), PageType.Topic)

      const { charts, tabular } = await extractAndFetchPageData(body)

      const store = initializeStore({ charts, tabular })

      const accordion = [
        {
          id: 'symptoms',
          body: rest.symptoms,
        },
        {
          id: 'transmission',
          body: rest.transmission,
        },
        {
          id: 'treatment',
          body: rest.treatment,
        },
        {
          id: 'prevention',
          body: rest.prevention,
        },
        {
          id: 'surveillance_and_reporting',
          body: rest.surveillance_and_reporting,
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
          initialZustandState: JSON.parse(JSON.stringify(store.getState())),
          ...(await serverSideTranslations(req.locale as string, ['common', 'topic'])),
        },
        revalidate,
      }
    }

    throw new Error('No slug found')
  } catch (error) {
    logger.error(error)
    return { notFound: true, revalidate }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  // Fetch the CMS pages with a topic type
  const pages = await getPages(PageType.Topic)

  if (pages.success) {
    const { items } = pages.data

    // Get the paths we want to pre-render based on the list of topic pages
    // NOTE: Temporarily filter out non-covid pages whilst these are hardcoded locally into the project
    const paths = items
      .filter((item) => item.meta.slug === 'coronavirus')
      .map(({ meta: { slug } }) => ({
        params: { slug },
      }))

    return { paths, fallback: 'blocking' }
  }

  return { paths: [], fallback: true }
}
