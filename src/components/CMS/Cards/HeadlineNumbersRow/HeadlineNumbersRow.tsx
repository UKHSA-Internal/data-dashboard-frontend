import { Fragment, ReactNode } from 'react'

import { Card } from '@/components/Card'
import { GridLimiter } from '@/components/GridLimiter'

interface HeadlineNumbersRowProps {
  columns: Array<ReactNode>
  cardProps?: Record<string, unknown>
}

export const HeadlineNumbersRow = ({ columns, cardProps }: HeadlineNumbersRowProps) => {
  return (
    <Card {...cardProps}>
      <GridLimiter>
        {columns.map((column, key) => (
          <Fragment key={key}>{column}</Fragment>
        ))}
      </GridLimiter>
    </Card>
  )
}
