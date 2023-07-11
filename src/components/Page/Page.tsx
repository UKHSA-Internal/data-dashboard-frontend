import { GridCol, GridRow, Link } from 'govuk-react'
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
          <GridCol setDesktopWidth="two-thirds">
            {lastUpdated && <LastUpdated>{t('lastUpdated', { value: new Date(lastUpdated) })}</LastUpdated>}
            {heading && (
              <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half-from-desktop">
                  <Heading>{heading}</Heading>
                  <Link
                    role="button"
                    draggable="false"
                    className="govuk-button govuk-button--start"
                    data-module="govuk-button"
                    href="/choose-topic"
                    style={{
                      marginTop: '25px',
                      marginLeft: 30,
                      color: 'white',
                    }}
                  >
                    All data
                    <svg
                      className="govuk-button__start-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="17.5"
                      height="19"
                      viewBox="0 0 33 40"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
                    </svg>
                  </Link>
                </div>
                <div className="govuk-grid-column-one-half-from-desktop"></div>
              </div>
            )}

            {description && <FormattedContent>{description}</FormattedContent>}
          </GridCol>
        </GridRow>
        {children}
      </Container>
    </>
  )
}
