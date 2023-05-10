import { ReactNode } from 'react'
import { Paragraph } from 'govuk-react'
import { useTranslation } from 'next-i18next'
import { Card, CardColumn } from '@/components/Card'
import { DownloadLink } from '@/components/DownloadLink'
import kebabCase from 'lodash/kebabCase'

interface ChartColumnProps {
  heading: string
  description: string
  children?: ReactNode
  chart: ReactNode
  download?: boolean
  cardProps?: Record<string, unknown>
}

export const ChartColumn = ({ heading, description, children, chart, download, cardProps }: ChartColumnProps) => {
  const { t } = useTranslation('common')
  return (
    <Card {...cardProps}>
      <CardColumn
        heading={heading}
        sideContent={download && <DownloadLink href="/api/download">{t('downloadBtn')}</DownloadLink>}
        data-testid={`column-${kebabCase(heading)}`}
      >
        <Paragraph supportingText>{description}</Paragraph>
        {children}
        {chart}
      </CardColumn>
    </Card>
  )
}
