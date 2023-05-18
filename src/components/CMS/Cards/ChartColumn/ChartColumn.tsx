import { ReactNode } from 'react'
import { Paragraph } from 'govuk-react'
import { Card, CardColumn } from '@/components/Card'
import kebabCase from 'lodash/kebabCase'

interface ChartColumnProps {
  heading: string
  description: string
  children?: ReactNode
  chart: ReactNode
  download?: ReactNode
  cardProps?: Record<string, unknown>
}

export const ChartColumn = ({ heading, description, children, chart, download, cardProps }: ChartColumnProps) => {
  return (
    <Card {...cardProps}>
      <CardColumn heading={heading} sideContent={download} data-testid={`column-${kebabCase(heading)}`}>
        <Paragraph supportingText>{description}</Paragraph>
        {children}
        {chart}
      </CardColumn>
    </Card>
  )
}
