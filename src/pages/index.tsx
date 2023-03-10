import { getRelatedLinks } from '@/api/getRelatedLinks'
import { getVirusesSummary } from '@/api/getVirusesSummary'
import { initMocks } from '@/mocks'
import { RelatedLinksResponse } from '@/mocks/api/related-links'
import { VirusesResponse } from '@/mocks/api/viruses'
import {
  GridCol,
  GridRow,
  H1,
  H2,
  H3,
  Link as ExternalLink,
  ListItem,
  Paragraph,
  RelatedItems,
  UnorderedList,
} from 'govuk-react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import RouterLink from 'next/link'

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({
  viruses: { viruses },
  relatedLinks,
}: HomeProps) {
  return (
    <>
      <H1>Respiratory viruses in England</H1>
      <GridRow>
        {viruses.map(({ name, description }) => {
          return (
            <GridCol key={name}>
              <RouterLink href={`viruses/${name.toLowerCase()}`} passHref>
                <H3>{name}</H3>
              </RouterLink>
              <Paragraph>{description}</Paragraph>
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
