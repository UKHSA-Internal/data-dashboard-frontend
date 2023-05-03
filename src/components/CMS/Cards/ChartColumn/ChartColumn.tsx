import { ReactNode } from 'react'
import { Paragraph } from 'govuk-react'
import { useTranslation } from 'next-i18next'
import { Card, CardColumn } from '@/components/Card'
import { DownloadLink } from '@/components/DownloadLink'

interface ChartColumnProps {
  heading: string
  description: string
  children: ReactNode
  chart: ReactNode
  cardProps?: Record<string, unknown>
}

export const ChartColumn = ({ heading, description, children, chart, cardProps }: ChartColumnProps) => {
  const { t } = useTranslation()
  return (
    <Card {...cardProps}>
      <CardColumn
        heading={heading}
        sideContent={<DownloadLink href="/api/download">{t('downloadBtn')}</DownloadLink>}
        data-testid={`column-${heading.toLowerCase()}`}
      >
        <Paragraph supportingText>{description}</Paragraph>
        {children}
        {chart}
      </CardColumn>
    </Card>
  )
}
