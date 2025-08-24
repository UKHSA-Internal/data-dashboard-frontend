import { TimePeriod } from '@/api/models/cms/Page/GlobalFilter'

export type MinMaxYear = { minDate: string; maxDate: string }
export type MinMaxFullDate = { date_from: string; date_to: string }

export const getMinMaxYears = (timePeriods: TimePeriod[]): MinMaxYear => {
  if (timePeriods.length === 0) {
    throw new Error('Cannot determine date range from empty time periods array')
  }

  const dateFromValues = timePeriods.map((period) => period.value.date_from)
  const dateToValues = timePeriods.map((period) => period.value.date_to)

  const minDateFull = dateFromValues.reduce((earliest, currentDate) =>
    currentDate < earliest ? currentDate : earliest
  )

  const maxDateFull = dateToValues.reduce((latest, currentDate) => (currentDate > latest ? currentDate : latest))

  return {
    minDate: minDateFull.substring(0, 4),
    maxDate: maxDateFull.substring(0, 4),
  }
}

export const getMinMaxFullDate = (timePeriods: TimePeriod[]): { date_from: string; date_to: string } => {
  if (timePeriods.length === 0) {
    throw new Error('Cannot determine date range from empty time periods array')
  }

  const dateFromValues = timePeriods.map((period) => period.value.date_from)
  const dateToValues = timePeriods.map((period) => period.value.date_to)

  const date_from = dateFromValues.reduce((earliest, currentDate) => (currentDate < earliest ? currentDate : earliest))

  const date_to = dateToValues.reduce((latest, currentDate) => (currentDate > latest ? currentDate : latest))

  return {
    date_from,
    date_to,
  }
}

export interface MinMaxTimePeriodLabelResponse {
  minLabel: string
  maxLabel: string
}

export const getMinMaxTimePeriodLabels = (timePeriods: TimePeriod[]): MinMaxTimePeriodLabelResponse => {
  if (timePeriods.length === 0) {
    throw new Error('Cannot determine time period labels from empty time periods array')
  }

  const earliestTimePeriod = timePeriods.reduce((earliest, current) =>
    current.value.date_from < earliest.value.date_from ? current : earliest
  )

  const latestTimePeriod = timePeriods.reduce((latest, current) =>
    current.value.date_to > latest.value.date_to ? current : latest
  )

  return {
    minLabel: earliestTimePeriod.value.label,
    maxLabel: latestTimePeriod.value.label,
  }
}
