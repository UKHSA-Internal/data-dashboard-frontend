import type { Response } from '@/api/requests/tables/getTables'

export const admissionsRateAgeValues: Response = [
  {
    values: [
      {
        label: 'Admission rate',
        value: 540.1,
        in_reporting_delay_period: false,
      },
    ],
    reference: '0-5',
  },
  {
    values: [
      {
        label: 'Admission rate',
        value: 1009.0,
        in_reporting_delay_period: false,
      },
    ],
    reference: '18-64',
  },
  {
    values: [
      {
        label: 'Admission rate',
        value: 174.1,
        in_reporting_delay_period: false,
      },
    ],
    reference: '6-17',
  },
  {
    values: [
      {
        label: 'Admission rate',
        value: 4361.0,
        in_reporting_delay_period: false,
      },
    ],
    reference: '65-84',
  },
  {
    values: [
      {
        label: 'Admission rate',
        value: 14890.0,
        in_reporting_delay_period: false,
      },
    ],
    reference: '85+',
  },
]
