import { ReactNode } from 'react'
import { GridCol, GridRow, Paragraph } from 'govuk-react'
import { Card, CardColumn } from '@/components/Card'

interface ChartWithHeadlineAndTrendProps {
  heading: string
  description: string
  chart: ReactNode
  sideContent: ReactNode
  columns: Array<ReactNode>
  cardProps?: Record<string, unknown>
}

export const ChartWithHeadlineAndTrend = ({
  heading,
  description,
  chart,
  sideContent,
  columns,
  cardProps,
}: ChartWithHeadlineAndTrendProps) => {
  return (
    <GridRow>
      <GridCol setWidth="one-half">
        <Card {...cardProps}>
          <CardColumn heading={heading} sideContent={sideContent} data-testid={`column-${heading.toLowerCase()}`}>
            <Paragraph supportingText>{description}</Paragraph>
            <GridRow>{columns}</GridRow>
            {chart}
          </CardColumn>
        </Card>
      </GridCol>
    </GridRow>
  )
}
