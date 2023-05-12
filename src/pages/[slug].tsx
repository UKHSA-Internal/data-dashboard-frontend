import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { initMocks } from '@/api/msw'
import { getPages, PageType } from '@/api/requests/cms/getPages'
import { Page } from '@/components/Page'
import { RelatedLinks } from '@/components/RelatedLinks/RelatedLinks'
import { FormattedContent } from '@/components/FormattedContent/FormattedContent'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import type { RelatedLinks as Links } from '@/api/models/cms/Page'

type CommonPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const CommonPage = ({ title, body, relatedLinks, lastUpdated }: CommonPageProps) => {
  if (!title) return null

  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <FormattedContent hasLinkedHeadings>{body}</FormattedContent>
      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

export default CommonPage

export const getStaticProps: GetStaticProps<{
  title: string
  body: string
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
        last_published_at: lastUpdated,
        related_links: relatedLinks = [],
      } = await getPageBySlug(String(params.slug), PageType.Common)

      // Parse the cms response and pick out only relevant data for the ui
      return {
        props: {
          title,
          body,
          lastUpdated,
          relatedLinks,
          ...(await serverSideTranslations(req.locale as string, ['common'])),
        },
        revalidate,
      }
    }

    throw new Error('No slug found')
  } catch (error) {
    console.log(error)
    return { notFound: true, revalidate }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  // Fetch the CMS pages with a topic type
  const pages = await getPages(PageType.Common)

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
