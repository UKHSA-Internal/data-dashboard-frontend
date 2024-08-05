import { z } from 'zod'

import { Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/tables/getTables'

import {
  admissionsRateAgeValues,
  cases_casesByDay,
  casesRateAgeSexValues,
  covidOccupiedMVBeds,
  deaths_ONSRollingMean,
  healthcare_ICUHDUadmissionrateByWeek,
  newCasesRollingRateValues,
  testing_positivityByWeek,
  weeklyPositivityByAgeValues,
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
 *          in_reporting_delay_period: false,
 *        }]
 *    },
 *    {
 *        date: '2022-11-30',
 *        values: [{
 *          label: "Plot1",
 *          value: '3608.0',
 *          in_reporting_delay_period: false,
 *        }]
 *    },
 *  ]
 *
 */

type Fixtures = Record<Topics, Record<string, z.infer<typeof responseSchema>>>

const nonUniqueMockedValues = cases_casesByDay

export const fixtures: Fixtures = {
  'COVID-19': {
    // BETA dataset (used on the mocked homepage)
    'COVID-19_cases_casesByDay': cases_casesByDay,
    'COVID-19_deaths_ONSRollingMean': deaths_ONSRollingMean,

    // ALPHA dataset (used on the mocked topic pages which are yet to be updated)
    admissions_rate_age: admissionsRateAgeValues,
    new_cases_daily: cases_casesByDay,
    new_cases_rolling_rate: newCasesRollingRateValues,
    new_deaths_daily: deaths_ONSRollingMean,
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
    // BETA dataset (used on the mocked homepage)
    influenza_healthcare_ICUHDUadmissionrateByWeek: healthcare_ICUHDUadmissionrateByWeek,
    influenza_testing_positivityByWeek: testing_positivityByWeek,

    // ALPHA dataset (used on the mocked topic pages which are yet to be updated)
    weekly_hospital_admissions_rate: healthcare_ICUHDUadmissionrateByWeek,
    weekly_positivity: testing_positivityByWeek,
    weekly_hospital_admissions_rate_by_age: nonUniqueMockedValues,
    weekly_icuhdu_admissions_rate: nonUniqueMockedValues,
    weekly_icu_admissions_rate_by_age: nonUniqueMockedValues,
    weekly_positivity_by_age: nonUniqueMockedValues,
  },
  Adenovirus: {
    weekly_positivity: testing_positivityByWeek,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
  Rhinovirus: {
    weekly_positivity: testing_positivityByWeek,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
  RSV: {
    weekly_positivity: testing_positivityByWeek,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
  Parainfluenza: {
    weekly_positivity: testing_positivityByWeek,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
  hMPV: {
    weekly_positivity: testing_positivityByWeek,
    weekly_positivity_by_age: weeklyPositivityByAgeValues,
  },
}
