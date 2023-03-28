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
import { formatCmsPageTopicResponse } from '@/api/requests/cms/formatters/formatPageResponse'
import { Page } from '@/components/Page'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { FormattedContent } from '@/components/FormattedContent'

type VirusPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const VirusPage = ({ title, body, relatedLinks, accordion, lastUpdated }: VirusPageProps) => {
  if (!title) return null

  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <Paragraph>{body}</Paragraph>
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Symptoms</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <FormattedContent>{accordion.symptoms}</FormattedContent>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Transmission</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <FormattedContent>{accordion.transmission}</FormattedContent>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Treatment</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <FormattedContent>{accordion.treatment}</FormattedContent>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Prevention</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <FormattedContent>{accordion.prevention}</FormattedContent>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Surveillance and reporting</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <FormattedContent>{accordion.surveillance_and_reporting}</FormattedContent>
          </AccordionItemPanel>
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

  if (process.env.CI)
    return {
      props: {
        title: '',
        body: '',
        lastUpdated: '',
        relatedLinks: [],
        accordion: {
          symptoms: '',
          transmission: '',
          treatment: '',
          prevention: '',
          surveillance_and_reporting: '',
        },
      },
      revalidate: 10,
    }

  try {
    const params = req.params

    // Check the slug exists in the url
    if (params && params.slug) {
      const page = await getPageBySlug(String(params.slug), PageType.Topic)

      // Parse the cms response and pick out only relevant data for the ui
      return {
        props: formatCmsPageTopicResponse(page),
        revalidate: 60,
      }
    }

    throw new Error('No slug found')
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
  return { paths, fallback: true }
}
