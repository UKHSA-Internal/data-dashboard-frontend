import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion/Accordion'
import { Paragraph } from 'govuk-react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { initMocks } from '@/api/msw'
import { getPages, PageType } from '@/api/requests/cms/getPages'
import { getPage, TopicPage } from '@/api/requests/cms/getPage'
import { formatCmsPageTopicResponse } from '@/api/requests/cms/formatters/formatPageResponse'
import { Page } from '@/components/Page'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'

type VirusPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const VirusPage = ({ title, body, relatedLinks, accordion, lastUpdated }: VirusPageProps) => {
  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <Paragraph>{body}</Paragraph>
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Symptoms</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{accordion.symptoms}</AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Transmission</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{accordion.transmission}</AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Treatment</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{accordion.treatment}</AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Prevention</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{accordion.prevention}</AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Surveillance and reporting</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>{accordion.surveillance_and_reporting}</AccordionItemPanel>
        </AccordionItem>
      </Accordion>

      <RelatedLinks links={relatedLinks} />
    </Page>
  )
}

export default VirusPage

type FormattedResponse = ReturnType<typeof formatCmsPageTopicResponse>

export const getStaticProps: GetStaticProps<FormattedResponse> = async (req) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const revalidate = 10

  try {
    const params = req.params

    // Check the slug exists in the url
    if (params && params.slug) {
      // Fetch all of the pages from the CMS
      const pages = await getPages(PageType.Topic)

      // Find the CMS page within the list that matches the current slug
      const matchedPage = pages.items.find(({ meta: { slug } }) => slug === params.slug)

      if (matchedPage) {
        // Once we have a match, use the id to fetch the single page
        const page = await getPage<TopicPage>(matchedPage.id)

        // Parse the cms response and pick out only relevant data for the ui
        return {
          props: {
            ...formatCmsPageTopicResponse(page),
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
  const { items } = await getPages(PageType.Topic)

  // Get the paths we want to pre-render based on the list of topic pages
  const paths = items.map(({ meta: { slug } }) => ({
    params: { slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
