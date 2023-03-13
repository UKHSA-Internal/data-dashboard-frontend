import { RelatedLinksResponse } from '@/mocks/api/related-links'
import { H2, ListItem, Paragraph, UnorderedList } from 'govuk-react'
import { BoldExternalLink, Container } from './RelatedLinks.styles'

interface RelatedLinksProps {
  data: RelatedLinksResponse
}

const RelatedLinks = ({ data }: RelatedLinksProps) => {
  return (
    <Container>
      <H2>Related Links</H2>
      <UnorderedList listStyleType="none">
        {data.map(({ title, link, description }) => (
          <ListItem key={link} aria-label="ukhsa-related-link">
            <BoldExternalLink href={link} rel="external">
              {title}
            </BoldExternalLink>
            <Paragraph>{description}</Paragraph>
          </ListItem>
        ))}
      </UnorderedList>
    </Container>
  )
}

export default RelatedLinks
