import { z } from 'zod'

import type { Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/trends/getTrends'

/**
 * Returns an object containing fixtures for specific percentage metrics
 *
 *  Example:
 *
 *  {
 *    {
 *      'COVID-19': {
 *        new_cases_7days_change_percentage: {
 *          metric_name: 'new_cases_7days_sum',
 *          metric_value: -692,
 *          percentage_metric_name: 'new_cases_7days_change_percentage',
 *          percentage_metric_value: -3.0
 *          colour: 'green',
 *          direction: 'down'
 *        },
 *    },
 *    {
 *      'Influenza': {
 *        weekly_hospital_admissions_rate_change_percentage: {
 *          metric_name: 'new_cases_7days_sum',
 *          metric_value: 1,
 *          percentage_metric_name: 'new_cases_7days_change_percentage',
 *          percentage_metric_value: 127.2
 *          colour: 'neutral',
 *          direction: 'neutral'
 *        },
 *    },
 *  }
 *
 */

type Fixtures = Record<Topics, Record<string, z.infer<typeof responseSchema>>>

export const fixtures: Fixtures = {
  'COVID-19': {
    'COVID-19_headline_newcases_7daypercentchange': {
      metric_name: 'COVID-19_headline_newcases_7daychange',
      metric_value: -592,
      percentage_metric_name: 'COVID-19_headline_newcases_7daypercentchange',
      percentage_metric_value: -3.0,
      colour: 'green',
      direction: 'down',
    },
    'COVID-19_headline_ONSdeaths_7daypercentchange': {
      metric_name: 'COVID-19_headline_ONSdeaths_7daychange',
      metric_value: 21,
      percentage_metric_name: 'COVID-19_headline_ONSdeaths_7daypercentchange',
      percentage_metric_value: -5.0,
      colour: 'green',
      direction: 'down',
    },
    'COVID-19_headline_7DayAdmissionsPercentChange': {
      metric_name: 'COVID-19_headline_7DayAdmisionsChange',
      metric_value: 377,
      percentage_metric_name: 'COVID-19_headline_7DayAdmissionsPercentChange',
      percentage_metric_value: 6.0,
      colour: 'red',
      direction: 'up',
    },
  },
  Influenza: {},
  Adenovirus: {},
  Rhinovirus: {},
  RSV: {},
  Parainfluenza: {},
  hMPV: {},
}
