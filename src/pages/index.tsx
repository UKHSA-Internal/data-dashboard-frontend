import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { RelatedLinks } from '@/components/RelatedLinks'
import { Page } from '@/components/Page'
import { initMocks } from '@/api/msw'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { PageType } from '@/api/requests/cms/getPages'
import { useTranslation } from 'next-i18next'
import type { RelatedLinks as Links, Body } from '@/api/models/cms/Page'
import { extractAndFetchPageData } from '@/api/requests/cms/extractAndFetchPageData'
import { Utils } from '@/components/CMS'
import { Contents, ContentsItem } from '@/components/Contents'
import { StoreState, initializeStore } from '@/lib/store'
import { logger } from '@/lib/logger'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ title, relatedLinks, lastUpdated, body }: HomeProps) {
  const { t } = useTranslation()

  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <Contents heading={t<string>('contentsHeading')}>
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
  lastUpdated: string
  relatedLinks: Links
  initialZustandState: StoreState
}> = async (req) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const revalidate = Number(process.env.NEXT_REVALIDATE_TIME)

  try {
    const {
      title,
      body,
      last_published_at: lastUpdated,
      related_links: relatedLinks = [],
    } = await getPageBySlug('respiratory-viruses', PageType.Home)

    const { charts, headlines, trends, tabular } = await extractAndFetchPageData(body)

    const store = initializeStore({ trends, headlines, charts, tabular })

    return {
      props: {
        title,
        body,
        lastUpdated,
        relatedLinks,
        initialZustandState: JSON.parse(JSON.stringify(store.getState())),
        ...(await serverSideTranslations(req.locale as string, ['common', 'topic'])),
      },
      revalidate,
    }
  } catch (error) {
    logger.error(error)
    return { notFound: true, revalidate }
  }
}
