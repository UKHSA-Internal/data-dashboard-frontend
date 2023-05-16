import { z } from 'zod'
import { Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/tabular/getTabular'
import { createFixture } from 'zod-fixture'

import {
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityValues,
  newCasesDailyValues,
  newDeathsDailyValues,
  weeklyPositivityByAgeValues,
  newCasesRollingRateValues,
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

type Fixtures = Record<Topics, Record<string, z.infer<typeof responseSchema>>>

const randomMockValues = createFixture(responseSchema)

export const fixtures: Fixtures = {
  'COVID-19': {
    new_cases_daily: newCasesDailyValues,
    new_cases_rolling_rate: newCasesRollingRateValues,
    new_deaths_daily: newDeathsDailyValues,
    new_admissions_daily: randomMockValues,
    covid_occupied_beds: randomMockValues,
    covid_occupied_MV_beds: randomMockValues,
    new_pcr_tests_daily: randomMockValues,
    positivity_PCR_rolling_sum: randomMockValues,
    new_vaccinations_autumn22: randomMockValues,
    vaccinations_percentage_uptake_autumn22: randomMockValues,
    new_vaccinations_spring22: randomMockValues,
    vaccinations_percentage_uptake_spring22: randomMockValues,
  },
  Influenza: {
    weekly_hospital_admissions_rate: weeklyHospitalAdmissionsRateValues,
    weekly_positivity: weeklyPositivityValues,
    weekly_hospital_admissions_rate_by_age: randomMockValues,
    weekly_icuhdu_admissions_rate: randomMockValues,
    weekly_icu_admissions_rate_by_age: randomMockValues,
    weekly_positivity_by_age: randomMockValues,
  },
  Adenovirus: {
    weekly_positivity: weeklyPositivityValues,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
  Rhinovirus: {
    weekly_positivity: weeklyPositivityValues,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
  RSV: {
    weekly_positivity: weeklyPositivityValues,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
  Parainfluenza: {
    weekly_positivity: weeklyPositivityValues,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
  hMPV: {
    weekly_positivity: weeklyPositivityValues,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
}
