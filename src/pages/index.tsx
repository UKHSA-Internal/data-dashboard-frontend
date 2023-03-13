import { getRelatedLinks } from '@/api/getRelatedLinks'
import { getVirusesSummary } from '@/api/getVirusesSummary'
// import { getDashboard } from '@/api/getDashboard'
import { initMocks } from '@/mocks'
import { RelatedLinksResponse } from '@/mocks/api/related-links'
import { VirusesResponse } from '@/mocks/api/viruses'
// import { DashboardResponse } from '@/mocks/api/dashboard'
import {
  GridCol,
  GridRow,
  H1,
  H2,
  Link as ExternalLink,
  ListItem,
  Paragraph,
  RelatedItems,
  UnorderedList,
} from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import VirusSummary from '@/components/VirusSummary/VirusSummary'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
  viruses: { viruses },
  relatedLinks,
}: HomeProps) {
  return (
    <>
      <H1>Respiratory viruses in England</H1>
      <Paragraph>
        UKHSA data and insights on respiratory viruses. Respiratory viruses can
        infect any age group. Some people (including children and the elderly)
        are more likely to become seriously ill or have other complications
        because of respiratory viruses. In the UK many of these viruses are
        seasonal and tend to circulate at higher levels during the winter
        months. We’re reporting on the 7 most common viruses in the UK causing
        respiratory infections. The graphs below show the proportion of positive
        samples (positivity).
      </Paragraph>
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

      {/* Hidden until #CDD-522 is worked on */}
      <RelatedItems style={{ display: 'none' }}>
        <H2>Related Links</H2>
        <UnorderedList listStyleType="none">
          {relatedLinks.map(({ title, link, description }) => (
            <ListItem key={link}>
              <ExternalLink href={link} rel="external">
                <strong>{title}</strong>
              </ExternalLink>
              <Paragraph>{description}</Paragraph>
            </ListItem>
          ))}
        </UnorderedList>
      </RelatedItems>
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
