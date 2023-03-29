import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { initMocks } from '@/api/msw'
import { getPages, PageType } from '@/api/requests/cms/getPages'
import { RelatedLink } from '@/api/requests/cms/getPage'
import { Page } from '@/components/Page'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { FormattedContent } from '@/components/FormattedContent/FormattedContent'
import { getPageBySlug } from '@/api/requests/getPageBySlug'

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
  relatedLinks: Array<RelatedLink>
}> = async (req) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

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
        },
        revalidate: 60,
      }
    }

    throw new Error('No slug found')
  } catch (error) {
    console.log(error)
    return { notFound: true, revalidate: 10 }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  // Skip SSG during CI workflow due to No AWS Access
  // The site will be built once deployed instead
  if (process.env.CI === 'true')
    return {
      paths: [],
      fallback: true,
    }

  // Fetch the CMS pages with a topic type
  const { items } = await getPages(PageType.Common)

  // Get the paths we want to pre-render based on the list of topic pages
  const paths = items.map(({ meta: { slug } }) => ({
    params: { slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true }
}
