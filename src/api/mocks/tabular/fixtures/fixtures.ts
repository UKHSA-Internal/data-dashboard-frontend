import { Topics } from '@/api/models'
import {
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityLatestValues,
  newCasesDailyValues,
  newDeathsDailyValues,
} from '.'

/**
 * Generates an object containing fixtures for all topics and 4 selected metrics
 *
 *  Example:
 *  [
 *   {
 *        date: '2022-10-31',
 *        value: '4630.0',
 *    },
 *    {
 *        date: '2022-11-30',
 *        value: '3608.0',
 *    },
 *  ]
 *
 */

export const fixtures = Object.fromEntries(
  Topics.options.map((topic) => [
    topic,
    {
      new_cases_daily: newCasesDailyValues,
      new_deaths_daily: newDeathsDailyValues,
      weekly_hospital_admissions_rate: weeklyHospitalAdmissionsRateValues,
      weekly_positivity_latest: weeklyPositivityLatestValues,
    },
  ])
)
