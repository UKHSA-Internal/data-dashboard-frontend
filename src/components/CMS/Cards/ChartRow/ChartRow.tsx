import { GridCol, GridRow } from 'govuk-react'
import { ReactNode } from 'react'

interface ChartRowProps {
  columns: Array<ReactNode>
}

export const ChartRow = ({ columns }: ChartRowProps) => (
  <GridRow>
    {columns.map((column, idx) => (
      <GridCol key={idx} setWidth={columns.length === 2 ? 'one-half' : 'full'}>
        {column}
      </GridCol>
    ))}
  </GridRow>
)
