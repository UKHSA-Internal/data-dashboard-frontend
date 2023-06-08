import { ReactNode } from 'react'
import { Container, Heading, LastUpdated } from './Page.styles'
import { useTranslation } from 'next-i18next'
import { Meta } from '../Meta'
import { FormattedContent } from '../FormattedContent'
import { GridCol, GridRow } from 'govuk-react'

interface PageProps {
  heading: string
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
          <GridCol setDesktopWidth="two-thirds">
            {lastUpdated && <LastUpdated>{t('lastUpdated', { value: new Date(lastUpdated) })}</LastUpdated>}
            <Heading>{heading}</Heading>
            {description && <FormattedContent>{description}</FormattedContent>}
          </GridCol>
        </GridRow>
        {children}
      </Container>
    </>
  )
}
