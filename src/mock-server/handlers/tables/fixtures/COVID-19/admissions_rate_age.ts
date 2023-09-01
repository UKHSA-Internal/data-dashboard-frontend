import type { Response } from '@/api/requests/tables/getTables'

export const admissionsRateAgeValues: Response = [
  {
    values: [
      {
        label: 'Admission rate',
        value: 540.1,
      },
    ],
    reference: '0-5',
  },
  {
    values: [
      {
        label: 'Admission rate',
        value: 1009.0,
      },
    ],
    reference: '18-64',
  },
  {
    values: [
      {
        label: 'Admission rate',
        value: 174.1,
      },
    ],
    reference: '6-17',
  },
  {
    values: [
      {
        label: 'Admission rate',
        value: 4361.0,
      },
    ],
    reference: '65-84',
  },
  {
    values: [
      {
        label: 'Admission rate',
        value: 14890.0,
      },
    ],
    reference: '85+',
  },
]
