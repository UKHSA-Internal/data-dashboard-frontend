import { Card } from '@/components/Card'
import { GridCol, GridRow } from 'govuk-react'
import { ReactNode } from 'react'

interface HeadlineNumbersRowProps {
  columns: Array<ReactNode>
  cardProps?: Record<string, unknown>
}

export const HeadlineNumbersRow = ({ columns, cardProps }: HeadlineNumbersRowProps) => {
  return (
    <Card {...cardProps}>
      <GridRow>
        {columns.map((column, key) => (
          <GridCol key={key}>{column}</GridCol>
        ))}
      </GridRow>
    </Card>
  )
}
