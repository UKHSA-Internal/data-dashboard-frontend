import type { BodyType } from './BodyType'
import type { Chart } from './Chart'
import type { Columns, HeadlineWithNumber, HeadlineWithTrend } from './Columns'

/**
 * Body Types
 * Variations of each object that can returned in the top-level body array
 */
export type PageBody = Body<'text'> | Body<'headline_numbers_row_card'> | Body<'chart_with_headline_and_trend_card'>

type WithText = {
  body: string
}

type WithHeadlineNumbersRowCard = {
  columns: Columns
}

type WithHeadlineAndTrendCard = {
  title: string
  body: string
  chart: Chart[]
  headline_number_columns: Array<
    | {
        id: string
        type: 'headline_number'
        value: HeadlineWithNumber
      }
    | {
        id: string
        type: 'trend_number'
        value: HeadlineWithTrend
      }
  >
}

// Conditional type to select the associated body type
type BodyValue<T extends BodyType> = T extends 'text'
  ? WithText
  : T extends 'headline_numbers_row_card'
  ? WithHeadlineNumbersRowCard
  : T extends 'chart_with_headline_and_trend_card'
  ? WithHeadlineAndTrendCard
  : never

export type Body<T extends BodyType> = {
  type: T
  value: BodyValue<T>
  id: string
}
