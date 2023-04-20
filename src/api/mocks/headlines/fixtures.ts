import { Metrics } from '@/api/models'
import { responseSchema } from '@/api/requests/headlines/getHeadlines'
import { createFixture } from 'zod-fixture'

/**
 * Generates an array of fixtures for all metrics
 *
 * zod-fixture will populate a default value for all metrics, unless specified
 * in the `mockedValues` Map, in which case this value will be used.
 */

// Overrides for specific metrics
const mockedValues = new Map<(typeof Metrics)[number], string>([
  ['new_cases_7days_sum', '123'],
  ['total_vaccinations_autumn22', '456'],
])

export const fixtures = Object.fromEntries(
  Metrics.map((metric) => [
    metric,
    createFixture(responseSchema, {
      customizations: [
        {
          condition: () => mockedValues.has(metric),
          generator: () => ({ value: mockedValues.get(metric) }),
        },
      ],
    }),
  ])
)
