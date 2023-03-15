import {
  getVirusesSummary,
  VirusesResponse,
} from '@/api/requests/getVirusesSummary'
import { GridCol, GridRow, H1, Paragraph } from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import VirusSummary from '@/components/VirusSummary/VirusSummary'
import RelatedLinks from '@/components/RelatedLinks/RelatedLinks'
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
