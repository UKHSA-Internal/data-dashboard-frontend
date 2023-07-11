import { Fragment, ReactNode } from 'react'

import { GridLimiter } from '@/components/GridLimiter'

interface HeadlineNumbersRowProps {
  columns: Array<ReactNode>
  cardProps?: Record<string, unknown>
}

export const HeadlineNumbersRow = ({ columns, cardProps }: HeadlineNumbersRowProps) => {
  return (
    <div {...cardProps}>
      <GridLimiter>
        {columns.map((column, key) => (
          <Fragment key={key}>{column}</Fragment>
        ))}
      </GridLimiter>
    </div>
  )
}
