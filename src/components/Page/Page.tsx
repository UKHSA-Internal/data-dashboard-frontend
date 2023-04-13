import { ReactNode } from 'react'
import { Container, Heading, LastUpdated } from './Page.styles'
import { useTranslation } from 'next-i18next'
import { Meta } from '../Meta'

interface PageProps {
  heading: string
  children: ReactNode
  lastUpdated?: string
}

export const Page = ({ children, heading, lastUpdated }: PageProps) => {
  const { t } = useTranslation('common')
  return (
    <>
      <Meta title={heading} />
      <Container>
        {lastUpdated && <LastUpdated>{t('lastUpdated', { value: new Date(lastUpdated) })}</LastUpdated>}
        <Heading>{heading}</Heading>
        {children}
      </Container>
    </>
  )
}
