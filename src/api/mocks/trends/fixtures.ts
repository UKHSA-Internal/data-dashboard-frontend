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
 *
 * zod-fixture will populate a default shape for all percentage metrics, unless specified
 * in the `mockedValues` Maps below, in which case this value will be used.
 *
 */

type MockedValues = Record<TopicKey, TopicValue>

type TopicKey = z.infer<typeof Topics>
type TopicValue = Map<MetricKey, MetricValue>

type MetricKey = z.infer<typeof PercentageMetrics>
type MetricValue = z.infer<typeof responseSchema>

const mockedValues: MockedValues = {
  'COVID-19': new Map<MetricKey, MetricValue>([
    [
      'new_cases_7days_change_percentage',
      {
        metric_name: 'new_cases_7days_change',
        metric_value: -592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_value: -3.0,
        colour: 'green',
        direction: 'down',
      },
    ],
    [
      'new_deaths_7days_change_percentage',
      {
        metric_name: 'new_deaths_7days_sum',
        metric_value: 21,
        percentage_metric_name: 'new_deaths_7days_change_percentage',
        percentage_metric_value: -5.0,
        colour: 'green',
        direction: 'down',
      },
    ],
    [
      'new_admissions_7days_change_percentage',
      {
        metric_name: 'new_admissions_7day_avg',
        metric_value: 377,
        percentage_metric_name: 'new_admissions_7days_change_percentage',
        percentage_metric_value: 6.0,
        colour: 'red',
        direction: 'up',
      },
    ],
    [
      'weekly_hospital_admissions_rate_change_percentage',
      {
        metric_name: 'weekly_hospital_admissions_rate_change',
        metric_value: 272,
        percentage_metric_name: 'weekly_hospital_admissions_rate_change_percentage',
        percentage_metric_value: 100,
        colour: 'red',
        direction: 'up',
      },
    ],
  ]),
  Influenza: new Map<MetricKey, MetricValue>([
    [
      'weekly_hospital_admissions_rate_change_percentage',
      {
        metric_name: 'weekly_hospital_admissions_rate_change',
        metric_value: 5911,
        percentage_metric_name: 'weekly_hospital_admissions_rate_change_percentage',
        percentage_metric_value: 0.3,
        colour: 'green',
        direction: 'down',
      },
    ],
  ]),
}

export const fixtures = Object.fromEntries(
  Topics.options.map((topic) => [
    topic,
    Object.fromEntries(
      PercentageMetrics.options.map((metric) => [
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
