import {
  getVirusesSummary,
  VirusesResponse,
} from '@/api/requests/getVirusesSummary'
import { initMocks } from '@/api/msw'
import { GridCol, GridRow, H1, Paragraph } from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import VirusSummary from '@/components/VirusSummary/VirusSummary'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
import { Contents, ContentsItem } from '@/components/Contents'
import {
  DashboardPage,
  getPage,
  PageResponse,
} from '@/api/requests/cms/getPage'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
  title,
  body,
  viruses: { viruses },
  relatedLinks,
}: HomeProps) {
  return (
    <>
      <H1>{title}</H1>

      <Paragraph>{body}</Paragraph>

      <Contents label="Respiratory viruses in this dashboard">
        <ContentsItem heading="Coronavirus">
          <Paragraph>
            The UKHSA dashboard for data and insights on Coronavirus.
          </Paragraph>

          {/* TODO as part of CDD-564 */}
          {/* <Card>
            <CardColumn heading="Cases">
              <Statistic heading="Weekly" value="20,629,892" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
            <CardColumn heading="Deaths">
              <Statistic heading="Weekly" value="393" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
            <CardColumn heading="Healthcare">
              <Statistic heading="Patients admitted" value="981,596" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
            <CardColumn heading="Vaccines">
              <Statistic heading="Spring booster" value="45,410,567" />
              <Statistic heading="Summer booster" value="42,939,917" />
            </CardColumn>
            <CardColumn heading="Testing">
              <Statistic heading="Virus tests positivity (%)" value="10.9%" />
              <Statistic heading="Last 7 days">tbc</Statistic>
            </CardColumn>
          </Card>
          <GridRow>
            <GridCol setWidth="one-half">
              <Card>
                <CardColumn heading="Cases">
                  <Statistic heading="People tested positive in England" />
                </CardColumn>
              </Card>
            </GridCol>
            <GridCol setWidth="one-half">
              <Card>
                <CardColumn heading="Deaths">
                  <Statistic heading="Deaths with COVID-19 on the death certificate in England" />
                </CardColumn>
              </Card>
            </GridCol>
          </GridRow> */}
        </ContentsItem>
        <ContentsItem heading="Influenza">
          <Paragraph>
            The UKHSA dashboard for data and insights on Influenza.
          </Paragraph>
        </ContentsItem>
      </Contents>

      <GridRow>
        {viruses.map(({ name, description, points }) => {
          return (
            <GridCol key={name}>
              <VirusSummary
                virus={name}
                description={description}
                points={points}
              />
            </GridCol>
          )
        })}
      </GridRow>

      <RelatedLinks data={relatedLinks} />
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  title: PageResponse<DashboardPage>['title']
  body: PageResponse<DashboardPage>['body']
  viruses: VirusesResponse
  relatedLinks: PageResponse<DashboardPage>['related_links']
}> = async () => {
  const [viruses] = await Promise.all([
    await getVirusesSummary({ searchTerm: '' }),
  ])

  const {
    title,
    body,
    related_links: relatedLinks,
  } = await getPage<DashboardPage>(1)

  return {
    props: {
      title,
      body,
      viruses,
      relatedLinks,
    },
  }
}
