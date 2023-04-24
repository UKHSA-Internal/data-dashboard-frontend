import type { Topics } from '../../Topics'
import type { ColumnType } from './ColumnType'

/**
 * Column Types
 * Variations of each object that can returned by the columns array
 */

export type Columns = Array<
  Column<'headline_and_trend_component'> | Column<'dual_headline_component'> | Column<'single_headline_component'>
>

type WithHeadlineAndTrend = {
  id: string
  type: 'headline_and_trend_component'
  value: {
    title: string
    headline_number: HeadlineWithNumber
    trend_number: HeadlineWithTrend
  }
}

type WithDualHeadline = {
  id: string
  type: 'dual_headline_component'
  value: {
    title: string
    top_headline_number: HeadlineWithNumber
    bottom_headline_number: HeadlineWithNumber
  }
}

type WithSingleHeadline = {
  id: string
  type: 'single_headline_component'
  value: {
    title: string
    headline_number: HeadlineWithNumber
  }
}

type Column<T extends ColumnType> = T extends 'headline_and_trend_component'
  ? WithHeadlineAndTrend
  : T extends 'dual_headline_component'
  ? WithDualHeadline
  : T extends 'single_headline_component'
  ? WithSingleHeadline
  : never

export type HeadlineWithNumber = {
  topic: Topics
  metric: string
  body: string
}

export type HeadlineWithTrend = {
  topic: Topics
  metric: string
  body: string
  percentage_metric: string
}
