import { RelatedLink } from '@/api/requests/cms/getPage'
import { H2, ListItem, UnorderedList } from 'govuk-react'
import { FormattedContent } from '../FormattedContent'
import { BoldExternalLink, Container } from './RelatedLinks.styles'

interface RelatedLinksProps {
  links: Array<RelatedLink>
}

const RelatedLinks = ({ links }: RelatedLinksProps) => {
  return (
    <Container>
      <H2>Related Links</H2>
      <UnorderedList listStyleType="none">
        {links.map(({ id, title, url, body }) => (
          <ListItem key={id}>
            <BoldExternalLink href={url} rel="external">
              {title}
            </BoldExternalLink>
            <FormattedContent>{body}</FormattedContent>
          </ListItem>
        ))}
      </UnorderedList>
    </Container>
  )
}

export default RelatedLinks
