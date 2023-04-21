import { z } from 'zod'
import { createFixture } from 'zod-fixture'
import { Metrics, Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/headlines/getHeadlines'

/**
 * Generates an object containing fixtures for all topics and metrics
 *
 *  Example:
 *
 *  {
 *    {
 *      'COVID-19': {
 *        new_cases_daily: { value: 'value-1' } ,
 *        new_cases_7day_avg: { value: 'value-2' }
 *    },
 *    {
 *      'Influenza': {
 *        new_cases_daily: { value: 'value-3' } ,
 *        new_cases_7day_avg: { value: 'value-4' }
 *    },
 *  }
 *
 *
 * zod-fixture will populate a default value for all metrics, unless specified
 * in the `mockedValues` Maps below, in which case this value will be used.
 *
 */

type MockedValues = Record<TopicKey, TopicValue>

type TopicKey = (typeof Topics)[number]
type TopicValue = Map<MetricKey, MetricValue>

type MetricKey = (typeof Metrics)[number]
type MetricValue = z.infer<typeof responseSchema>['value']

const mockedValues: MockedValues = {
  'COVID-19': new Map<MetricKey, MetricValue>([
    ['new_cases_7days_sum', 24298],
    ['new_deaths_7days_sum', 379],
    ['new_admissions_7days', 6288],
    ['latest_total_vaccinations_autumn22', 4095083],
    ['latest_vaccinations_uptake_autumn22', 64.5],
    ['positivity_7days_latest', 10.4],
  ]),
  Influenza: new Map<MetricKey, MetricValue>([
    ['weekly_hospital_admissions_rate_latest', 981596],
    ['weekly_positivity_latest', 12.2],
  ]),
}

export const fixtures = Object.fromEntries(
  Topics.map((topic) => [
    topic,
    Object.fromEntries(
      Metrics.map((metric) => [
        metric,
        createFixture(responseSchema, {
          customizations: [
            {
              condition: () => mockedValues[topic].has(metric),
              generator: () => ({ value: mockedValues[topic].get(metric) }),
            },
          ],
        }),
      ])
    ),
  ])
)
