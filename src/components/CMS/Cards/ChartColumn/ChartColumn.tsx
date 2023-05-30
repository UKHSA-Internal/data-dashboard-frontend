import { ReactNode } from 'react'
import { Card, CardColumn } from '@/components/Card'
import kebabCase from 'lodash/kebabCase'
import { SecondaryText } from './ChartColumn.styles'

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
        <SecondaryText supportingText>{description}</SecondaryText>
        {children}
        {chart}
      </CardColumn>
    </Card>
  )
}
