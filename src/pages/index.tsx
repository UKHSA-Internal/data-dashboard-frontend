import { Contents, ContentsItem } from '@/components/Contents'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { initializeStore } from '@/lib/store'

import { Page } from '@/components/Page'
import { PageType } from '@/api/requests/cms/getPages'
import { RelatedLinks } from '@/components/RelatedLinks'
import { Utils } from '@/components/CMS'
import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { getStaticPropsRevalidateValue } from '@/config/app-utils'
import { initMocks } from '@/api/msw'
import { logger } from '@/lib/logger'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

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

export const getStaticProps = async (req: GetStaticPropsContext) => {
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
  }
}
