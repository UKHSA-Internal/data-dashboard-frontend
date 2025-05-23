import { z } from 'zod'

import type { Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/headlines/getHeadlines'

/**
 * Returns an object containing fixtures for specific metrics
 *
 *  Example:
 *
 *  {
 *    {
 *      'COVID-19': {
 *        new_cases_daily: { value: 1, period_end: '2023-11-03' },
 *        new_cases_7day_avg: { value: 2, period_end: '2023-11-03' }
 *    },
 *    {
 *      'Influenza': {
 *        new_cases_daily: { value: 3 } ,
 *        new_cases_7day_avg: { value: 4 }
 *    },
 *  }
 *
 */

type Fixtures = Record<Topics, Record<string, z.infer<typeof responseSchema>>>

export const fixtures: Fixtures = {
  'COVID-19': {
    'COVID-19_headline_newcases_7daytotals': { value: 24298, period_end: '2025-11-03' },
    'COVID-19_headline_cases_7DayPercentChange': { value: 722, period_end: '2025-11-03' },
    'COVID-19_headline_ONSdeaths_7DayTotals': { value: 722, period_end: '2025-11-03' },
    'COVID-19_headline_ONSdeaths_7DayChange': { value: 34, period_end: '2025-11-03' },
    'COVID-19_headline_7DayAdmissions': { value: 6288, period_end: '2025-11-03' },
    'COVID-19_headline_vaccines_autumn23Uptake': { value: 59, period_end: '2025-11-03' },
    'COVID-19_headline_positivity_latest': { value: 10.4, period_end: '2025-11-03' },
  },
  Influenza: {
    influenza_headline_ICUHDUadmissionrateLatest: { value: 981596, period_end: '2023-11-03' },
    influenza_headline_positivityLatest: { value: 0.2558, period_end: '2023-11-03' },
  },
  Adenovirus: {},
  Rhinovirus: {},
  RSV: {},
  Parainfluenza: {},
  hMPV: {},
}
