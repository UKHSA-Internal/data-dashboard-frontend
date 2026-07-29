import type { Response } from '@/api/requests/tables/getTables'

/**
 * Tabular data for a dual category chart (e.g. cases by age and sex).
 *
 * The structure matches the standard tables response: each `reference` (the
 * primary category, here an age band) holds a `values` entry per secondary
 * category value (here sex). The dual category table pivots this so each
 * secondary value is rendered as its own block.
 */
export const dualCategoryTableValues: Response = [
  {
    reference: '00-01',
    values: [
      { label: 'male', value: 8, in_reporting_delay_period: false },
      { label: 'female', value: 12, in_reporting_delay_period: false },
    ],
  },
  {
    reference: '01-05',
    values: [
      { label: 'male', value: 5, in_reporting_delay_period: false },
      { label: 'female', value: 15, in_reporting_delay_period: false },
    ],
  },
  {
    reference: '05-10',
    values: [
      { label: 'male', value: 11, in_reporting_delay_period: false },
      { label: 'female', value: 9, in_reporting_delay_period: false },
    ],
  },
  {
    reference: '10-15',
    values: [
      { label: 'male', value: 14, in_reporting_delay_period: false },
      { label: 'female', value: 18, in_reporting_delay_period: false },
    ],
  },
  {
    reference: '15-20',
    values: [
      { label: 'male', value: 7, in_reporting_delay_period: false },
      { label: 'female', value: 21, in_reporting_delay_period: false },
    ],
  },
]
