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
 *        new_cases_daily: { value: 1 } ,
 *        new_cases_7day_avg: { value: 2 }
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
    'COVID-19_headline_newcases_7daytotals': { value: 24298 },
    'COVID-19_headline_ONSdeaths_7daytotals': { value: 379 },
    'COVID-19_headline_7DayAdmissions': { value: 6288 },
    'COVID-19_headline_totalvaccines_spring23': { value: 4095083 },
    'COVID-19_headline_positivity_latest': { value: 10.4 },
    'COVID-19_headline_newcases_7daychange': { value: 722 },
  },
  Influenza: {
    influenza_headline_ICUHDUadmissionrateLatest: { value: 981596 },
    influenza_headline_positivityLatest: { value: 0.2558 },
  },
  Adenovirus: {},
  Rhinovirus: {},
  RSV: {},
  Parainfluenza: {},
  hMPV: {},
}
