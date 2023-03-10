import {
  getRelatedLinks,
  RelatedLinksResponse,
} from '@/api/requests/getRelatedLinks'
import {
  getVirusesSummary,
  VirusesResponse,
} from '@/api/requests/getVirusesSummary'
import { initMocks } from '@/api/msw'
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
