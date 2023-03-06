import { getRelatedLinks } from '@/api/getRelatedLinks'
import { getVirusesSummary } from '@/api/getVirusesSummary'
import Search from '@/components/Search/Search'
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
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import RouterLink from 'next/link'

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function Home({
  viruses: { viruses },
  relatedLinks,
  searchTerm,
}: HomeProps) {
  return (
    <>
      <H1>Respiratory viruses in England</H1>

      <Search defaultValue={searchTerm} />

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

type DashboardQueryParams = {
  searchTerm: string | undefined
}

export const getServerSideProps: GetServerSideProps<{
  viruses: VirusesResponse
  relatedLinks: RelatedLinksResponse
  searchTerm: string | undefined
}> = async (context) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    await initMocks()
  }

  const queryParams = context.query as DashboardQueryParams
  const searchTerm = queryParams.searchTerm ?? ''

  const [viruses, relatedLinks] = await Promise.all([
    await getVirusesSummary({ searchTerm }),
    await getRelatedLinks(),
  ])

  return {
    props: {
      viruses,
      relatedLinks,
      searchTerm,
    },
  }
}
