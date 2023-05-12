import { MetricsEnum, Topics } from '@/api/models'
import { createFixture } from 'zod-fixture'

import {
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityLatestValues,
  newCasesDailyValues,
  newDeathsDailyValues,
} from '.'
import { responseSchema } from '@/api/requests/tabular/getTabular'

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

// Create randomised automatic response fixtures for every metric
const automaticFixtures = Object.fromEntries(
  MetricsEnum.options.map((metric) => [metric, createFixture(responseSchema)])
)

// Manual fixtures (Ensures non-random data - usable in tests/e2es)
const manualFixtures = {
  new_cases_daily: newCasesDailyValues,
  new_deaths_daily: newDeathsDailyValues,
  weekly_hospital_admissions_rate: weeklyHospitalAdmissionsRateValues,
  weekly_positivity_latest: weeklyPositivityLatestValues,
}

export const fixtures = Object.fromEntries(
  Topics.options.map((topic) => [
    topic,
    {
      ...automaticFixtures,
      ...manualFixtures,
    },
  ])
)
