import { z } from 'zod'
import { Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/tabular/getTabular'

import {
  weeklyHospitalAdmissionsRateValues,
  weeklyPositivityValues,
  newCasesDailyValues,
  newDeathsDailyValues,
  weeklyPositivityByAgeValues,
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

export const fixtures: Fixtures = {
  'COVID-19': {
    new_cases_daily: newCasesDailyValues,
    new_deaths_daily: newDeathsDailyValues,
  },
  Influenza: {
    weekly_hospital_admissions_rate: weeklyHospitalAdmissionsRateValues,
    weekly_positivity: weeklyPositivityValues,
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
