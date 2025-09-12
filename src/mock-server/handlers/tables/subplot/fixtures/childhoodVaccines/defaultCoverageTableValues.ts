import type { Response } from '@/api/requests/tables/subplot/getSubplotTables'

export const defaultCoverageTableValues: Response = [
  {
    reference: 'England',
    values: [
      {
        in_reporting_delay_period: false,
        label: '6-in-1 (12 months)',
        value: 88.0,
      },
      {
        in_reporting_delay_period: false,
        label: '6-in-1 (24 months)',
        value: 78.0,
      },
      {
        in_reporting_delay_period: false,
        label: 'MMR1 (24 months)',
        value: 84.0,
      },
    ],
  },
  {
    reference: 'North East',
    values: [
      {
        in_reporting_delay_period: false,
        label: '6-in-1 (12 months)',
        value: 97.0,
      },
      {
        in_reporting_delay_period: false,
        label: '6-in-1 (24 months)',
        value: 89.0,
      },
      {
        in_reporting_delay_period: false,
        label: 'MMR1 (24 months)',
        value: 84.0,
      },
    ],
  },
  {
    reference: 'Darlington',
    values: [
      {
        in_reporting_delay_period: false,
        label: '6-in-1 (12 months)',
        value: 90.0,
      },
      {
        in_reporting_delay_period: false,
        label: '6-in-1 (24 months)',
        value: 87.0,
      },
      {
        in_reporting_delay_period: false,
        label: 'MMR1 (24 months)',
        value: 93.0,
      },
    ],
  },
]
