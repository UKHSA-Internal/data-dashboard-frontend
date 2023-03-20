import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { initMocks } from '@/api/msw'
import { getPages, PageType } from '@/api/requests/cms/getPages'
import { CommonPage as CommonPageType, getPage, PageResponse } from '@/api/requests/cms/getPage'
import { Page } from '@/components/Page'
import { H1, H2, H3, Link, ListItem, Paragraph, UnorderedList } from 'govuk-react'
import rehypeRaw from 'rehype-raw'
import { CMSContent } from './[slug].styles'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'

type CommonPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const CommonPage = ({ title, body, relatedLinks }: CommonPageProps) => {
  return (
    <Page heading={title}>
      <CMSContent
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ ...props }) => <H1 {...props} />,
          h2: ({ ...props }) => <H2 {...props} />,
          h3: ({ ...props }) => <H3 {...props} />,
          // p: ({ ...props }) => <Paragraph {...props} />,
          a: ({ ...props }) => <Link {...props} />,
          ul: ({ ...props }) => <UnorderedList {...props} />,
          li: ({ ...props }) => <ListItem {...props} />,
        }}
      >
        {body}
      </CMSContent>
      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

export default CommonPage

export const getStaticProps: GetStaticProps<{
  title: PageResponse['title']
  body: PageResponse['body']
  relatedLinks: PageResponse['related_links']
}> = async (req) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const revalidate = 10

  try {
    const params = req.params

    // Check the slug exists in the url
    if (params && params.slug) {
      // Fetch all of the common pages from the CMS
      const pages = await getPages(PageType.Common)

      // Find the CMS page within the list that matches the current page
      const matchedPage = pages.items.find(({ meta: { slug } }) => slug === params.slug)

      if (matchedPage) {
        // Once we have a match, use the id to fetch the single page
        const { title, body, related_links: relatedLinks } = await getPage<CommonPageType>(matchedPage.id)

        // Parse the cms response and pick out only relevant data for the ui
        return {
          props: {
            title,
            body,
            relatedLinks,
            revalidate,
          },
        }
      }

      throw new Error('Could not find page matching current slug')
    }

    throw new Error('URL does not contain a slug')
  } catch (error) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
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
  return { paths, fallback: 'blocking' }
}
