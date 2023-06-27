import { H2, ListItem, UnorderedList } from 'govuk-react'
import { useTranslation } from 'next-i18next'

import type { RelatedLinks as Links } from '@/api/models/cms/Page'

import { BoldExternalLink, Container } from './RelatedLinks.styles'

interface RelatedLinksProps {
  links: Links
}

export const RelatedLinks = ({ links }: RelatedLinksProps) => {
  const { t } = useTranslation('common')
  return (
    <Container>
      <H2>{t('relatedLinksHeading')}</H2>
      <UnorderedList listStyleType="none">
        {links.map(({ id, title, url, body }) => (
          <ListItem key={id}>
            <BoldExternalLink href={url} rel="external">
              {title}
            </BoldExternalLink>
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </ListItem>
        ))}
      </UnorderedList>
    </Container>
  )
}
