import {
  getRelatedLinks,
  RelatedLinksResponse,
} from '@/api/requests/getRelatedLinks'
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

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
  viruses: { viruses },
  relatedLinks,
}: HomeProps) {
  return (
    <>
      <H1>Respiratory viruses</H1>

      <Paragraph>
        Data and insights from the UKHSA on respiratory viruses.
      </Paragraph>

      <Contents label="Respiratory viruses in this dashboard">
        <ContentsItem heading="Coronavirus">
          <Paragraph>
            The UKHSA dashboard for data and insights on Coronavirus.
          </Paragraph>
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
  viruses: VirusesResponse
  relatedLinks: RelatedLinksResponse
}> = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const [viruses, relatedLinks] = await Promise.all([
    await getVirusesSummary({ searchTerm: '' }),
    await getRelatedLinks(),
  ])

  return {
    props: {
      viruses,
      relatedLinks,
    },
  }
}
