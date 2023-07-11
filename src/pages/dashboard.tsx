import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { initMocks } from '@/api/msw'
import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { PageType } from '@/api/requests/cms/getPages'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { Utils } from '@/components/CMS'
import { Page } from '@/components/Page'
import { getStaticPropsRevalidateValue } from '@/config/app-utils'
import { logger } from '@/lib/logger'
import { initializeStore } from '@/lib/store'

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
      {/* <Contents heading={t('contentsHeading')}> */}
      <div style={{ display: 'flex', gap: 60 }}>
        {body.map(({ id, value }) => (
          // <ContentsItem key={id} heading={value.heading}>
          <div key={id} style={{ width: '50%' }} className="govuk-!-margin-top-4">
            <h2 className="govuk-heading-l govuk-!-margin-bottom-3">{value.heading}</h2>
            {value.content.map(Utils.renderCard)}
          </div>
          // </ContentsItem>
        ))}
      </div>
      {/* </Contents> */}

      {/* <RelatedLinks links={relatedLinks} /> */}
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
    throw new Error(`Failed to fetch homepage: ${error}`)
  }
}
