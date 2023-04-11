import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion/Accordion'
import { GridCol, GridRow, Paragraph } from 'govuk-react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { initMocks } from '@/api/msw'
import { getPages, PageType } from '@/api/requests/cms/getPages'
import { formatCmsPageTopicResponse } from '@/api/requests/cms/formatters/formatPageResponse'
import { Page } from '@/components/Page'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { getPageBySlug } from '@/api/requests/getPageBySlug'
import { FormattedContent } from '@/components/FormattedContent'
import { Contents, ContentsItem } from '@/components/Contents'
import { Card, CardColumn } from '@/components/Card'
import { Statistic } from '@/components/Statistic'
import Trend from '@/components/Trend/Trend'
import { Chart } from '@/components/Chart'

type VirusPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const VirusPage = ({ title, body, relatedLinks, accordion, lastUpdated }: VirusPageProps) => {
  if (!title) return null

  return (
    <Page heading={title} lastUpdated={lastUpdated}>
      <Paragraph>{body}</Paragraph>

      <Contents>
        <ContentsItem heading="Cases">
          <p>Coronavirus cases text</p>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card label="Coronavirus cases" theme={'secondary'}>
                <CardColumn heading="Cases">
                  <Statistic heading="People tested positive in England">
                    <Paragraph supportingText>Up to and including 25th February 2023</Paragraph>
                  </Statistic>
                  <GridRow>
                    <GridCol setWidth="columnOneThird">
                      <Statistic heading="Last 7 days" value="24,568" />
                    </GridCol>
                    <GridCol>
                      <Trend direction="down" colour="green" value={'-1,600 (-6.1%)'} />
                    </GridCol>
                  </GridRow>
                  <Chart src="" fallback="" />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half"></GridCol>
          </GridRow>
        </ContentsItem>
        <ContentsItem heading="Deaths">Deaths content</ContentsItem>
        <ContentsItem heading="Healthcare">Healthcare content</ContentsItem>
        <ContentsItem heading="Vaccines">Vaccines content</ContentsItem>
        <ContentsItem heading="Testing">Testing content</ContentsItem>
        <ContentsItem heading="About">About content</ContentsItem>
      </Contents>

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

  const revalidate = Number(process.env.NEXT_REVALIDATE_TIME)

  try {
    const params = req.params

    // Check the slug exists in the url
    if (params && params.slug) {
      const page = await getPageBySlug(String(params.slug), PageType.Topic)

      // Parse the cms response and pick out only relevant data for the ui
      return {
        props: formatCmsPageTopicResponse(page),
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
  const { items } = await getPages(PageType.Topic)

  // Get the paths we want to pre-render based on the list of topic pages
  // NOTE: Temporarily filter out covid/influenza pages whilst these are hardcoded locally into the project
  const paths = items
    .filter((item) => item.meta.slug === 'Coronavirus' || item.meta.slug === 'Influenza')
    .map(({ meta: { slug } }) => ({
      params: { slug },
    }))

  return { paths, fallback: 'blocking' }
}
