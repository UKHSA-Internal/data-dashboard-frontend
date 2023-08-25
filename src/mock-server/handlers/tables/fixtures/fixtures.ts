import { z } from 'zod'

import { Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/tables/getTables'

import {
  casesRateAgeSexValues,
  covidOccupiedMVBeds,
  newCasesDailyValues,
  newCasesRollingRateValues,
  newDeathsDailyValues,
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityByAgeValues,
  weeklyPositivityValues,
} from '.'

/**
 * Generates an object containing fixtures for all topics and 4 selected metrics
 *
 *  Example:
 *  [
 *   {
 *        date: '2022-10-31',
 *        values: [{
 *          label: "Plot1",
 *          value: '4630.0',
 *        }]
 *    },
 *    {
 *        date: '2022-11-30',
 *        values: [{
 *          label: "Plot1",
 *          value: '3608.0',
 *        }]
 *    },
 *  ]
 *
 */

type Fixtures = Record<Topics, Record<string, z.infer<typeof responseSchema>>>

const nonUniqueMockedValues = newCasesDailyValues

export const fixtures: Fixtures = {
  'COVID-19': {
    new_cases_daily: newCasesDailyValues,
    new_cases_rolling_rate: newCasesRollingRateValues,
    new_deaths_daily: newDeathsDailyValues,
    new_admissions_daily: nonUniqueMockedValues,
    covid_occupied_beds: nonUniqueMockedValues,
    covid_occupied_MV_beds: covidOccupiedMVBeds,
    cases_rate_age_sex: casesRateAgeSexValues,
    new_pcr_tests_daily: nonUniqueMockedValues,
    positivity_PCR_rolling_sum: nonUniqueMockedValues,
    new_vaccinations_autumn22: nonUniqueMockedValues,
    vaccinations_percentage_uptake_autumn22: nonUniqueMockedValues,
    new_vaccinations_spring22: nonUniqueMockedValues,
    vaccinations_percentage_uptake_spring22: nonUniqueMockedValues,
  },
  Influenza: {
    weekly_hospital_admissions_rate: weeklyHospitalAdmissionsRateValues,
    weekly_positivity: weeklyPositivityValues,
    weekly_hospital_admissions_rate_by_age: nonUniqueMockedValues,
    weekly_icuhdu_admissions_rate: nonUniqueMockedValues,
    weekly_icu_admissions_rate_by_age: nonUniqueMockedValues,
    weekly_positivity_by_age: nonUniqueMockedValues,
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
