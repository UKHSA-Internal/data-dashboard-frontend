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
        {viruses.map(({ name, description }) => {
          return (
            <GridCol key={name}>
              <RouterLink href={`viruses/${name.toLowerCase()}`} passHref>
                <VirusSummary virus={name} />
              </RouterLink>
              <Paragraph>{description}</Paragraph>
            </GridCol>
          )
        })}
      </GridRow>

      <RelatedItems>
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

  const [virusesResponse, relatedLinksResponse] = await Promise.all([
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/viruses`),
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/related-links`),
  ])

  const [viruses, relatedLinks] = await Promise.all([
    await virusesResponse.json(),
    await relatedLinksResponse.json(),
  ])

  return {
    props: {
      viruses,
      relatedLinks,
    },
    revalidate: 10,
  }
}
