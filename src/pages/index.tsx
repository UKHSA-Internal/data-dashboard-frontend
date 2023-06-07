import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { RelatedLinks } from '@/components/RelatedLinks'
import { Page } from '@/components/Page'
import { initMocks } from '@/api/msw'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { PageType } from '@/api/requests/cms/getPages'
import { useTranslation } from 'next-i18next'
import type { RelatedLinks as Links, Body, Meta } from '@/api/models/cms/Page'
import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { Utils } from '@/components/CMS'
import { Contents, ContentsItem } from '@/components/Contents'
import { StoreState, initializeStore } from '@/lib/store'
import { logger } from '@/lib/logger'
import { getStaticPropsRevalidateValue } from '@/config/app-utils'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ title, description, relatedLinks, lastUpdated, body, meta }: HomeProps) {
  const { t } = useTranslation()

  return (
    <Page
      heading={title}
      description={description}
      lastUpdated={lastUpdated}
      seoTitle={meta.seo_title}
      seoDescription={meta.search_description}
    >
      <Contents heading={t('contentsHeading')}>
        {body.map(({ id, value }) => (
          <ContentsItem key={id} heading={value.heading}>
            {value.content.map(Utils.renderCard)}
          </ContentsItem>
        ))}
      </Contents>

      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps<{
  title: string
  body: Body
  description: string
  lastUpdated: string
  relatedLinks: Links
  initialZustandState: StoreState
  meta: Meta
}> = async (req) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  try {
    const {
      title,
      body,
      page_description: description,
      last_published_at: lastUpdated,
      related_links: relatedLinks = [],
      meta,
    } = await getPageBySlug('respiratory-viruses', PageType.Home)

    const { charts, headlines, trends, tabular } = await extractAndFetchPageData(body)

    const store = initializeStore({ trends, headlines, charts, tabular })

    return {
      props: {
        title,
        body,
        description,
        lastUpdated,
        relatedLinks,
        meta,
        initialZustandState: JSON.parse(JSON.stringify(store.getState())),
        ...(await serverSideTranslations(req.locale as string, ['common', 'topic'])),
      },
      revalidate: getStaticPropsRevalidateValue(),
    }
  } catch (error) {
    logger.error(error)
    return { notFound: true, revalidate: getStaticPropsRevalidateValue() }
  }
}
