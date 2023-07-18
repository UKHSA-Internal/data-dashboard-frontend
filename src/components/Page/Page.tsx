import { GridCol, GridRow } from 'govuk-react'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { FormattedContent } from '../FormattedContent'
import { Meta } from '../Meta'
import { Container, Heading, LastUpdated } from './Page.styles'

interface PageProps {
  heading?: string
  description?: string
  children: ReactNode
  lastUpdated?: string
  seoTitle: string
  seoDescription: string
}

export const Page = ({ children, heading, description, lastUpdated, seoTitle, seoDescription }: PageProps) => {
  const { t } = useTranslation('common')
  return (
    <>
      <Meta title={seoTitle} description={seoDescription} />
      <Container>
        <GridRow>
          <GridCol>
            {lastUpdated && <LastUpdated>{t('lastUpdated', { value: new Date(lastUpdated) })}</LastUpdated>}
            {heading && <Heading>{heading}</Heading>}
            {description && <FormattedContent>{description}</FormattedContent>}
          </GridCol>
        </GridRow>
        {children}
      </Container>
    </>
  )
}
