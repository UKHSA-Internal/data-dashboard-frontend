import { z } from 'zod'
import { createFixture } from 'zod-fixture'
import { PercentageMetrics, Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/trends/getTrends'

/**
 * Generates an object containing fixtures for all topics and metrics
 *
 *  Example:
 *
 *  {
 *    {
 *      'COVID-19': {
 *        new_cases_7days_change_percentage: {
 *          value: -692,
 *          percentage_value: -3.0
 *          colour: 'green',
 *          direction: 'down'
 *        },
 *    },
 *    {
 *      'Influenza': {
 *        weekly_hospital_admissions_rate_change_percentage: {
 *          value: 1,
 *          percentage_value: 127.2
 *          colour: 'neutral',
 *          direction: 'neutral'
 *        },
 *    },
 *  }
 *
 *
 * zod-fixture will populate a default shape for all percentage metrics, unless specified
 * in the `mockedValues` Maps below, in which case this value will be used.
 *
 */

type MockedValues = Record<TopicKey, TopicValue>

type TopicKey = (typeof Topics)[number]
type TopicValue = Map<MetricKey, MetricValue>

type MetricKey = (typeof PercentageMetrics)[number]
type MetricValue = z.infer<typeof responseSchema>

const mockedValues: MockedValues = {
  'COVID-19': new Map<MetricKey, MetricValue>([
    ['new_cases_7days_change_percentage', { value: -592, percentage_value: -3.0, colour: 'green', direction: 'down' }],
    ['new_deaths_7days_change_percentage', { value: 21, percentage_value: -5.0, colour: 'green', direction: 'down' }],
    ['new_admissions_7days_change_percentage', { value: 377, percentage_value: 6.0, colour: 'red', direction: 'up' }],
  ]),
  Influenza: new Map<MetricKey, MetricValue>([
    [
      'weekly_hospital_admissions_rate_change_percentage',
      { value: 5911, percentage_value: 0.3, colour: 'green', direction: 'down' },
    ],
  ]),
}

export const fixtures = Object.fromEntries(
  Topics.map((topic) => [
    topic,
    Object.fromEntries(
      PercentageMetrics.map((metric) => [
        metric,
        createFixture(responseSchema, {
          customizations: [
            {
              condition: () => mockedValues[topic].has(metric),
              generator: () => mockedValues[topic].get(metric),
            },
          ],
        }),
      ])
    ),
  ])
)
