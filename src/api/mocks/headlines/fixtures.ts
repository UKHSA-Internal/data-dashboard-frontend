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
    new_cases_7days_sum: { value: 24298 },
    new_deaths_7days_sum: { value: 379 },
    new_admissions_7days: { value: 6288 },
    latest_total_vaccinations_autumn22: { value: 4095083 },
    latest_vaccinations_uptake_autumn22: { value: 64.5 },
    positivity_7days_latest: { value: 10.4 },
  },
  Influenza: {
    weekly_hospital_admissions_rate_latest: { value: 981596 },
    weekly_positivity_latest: { value: 12.2 },
  },
}
