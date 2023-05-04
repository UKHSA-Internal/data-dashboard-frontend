import { z } from 'zod'
import { responseSchema } from '@/api/requests/tabular/getTabular'

type MockedValues = z.infer<typeof responseSchema>

export const weeklyHospitalAdmissionsRateValues: MockedValues = [
  {
    date: '2022-10-31',
    value: '4630.0',
  },
  {
    date: '2022-11-30',
    value: '3608.0',
  },
  {
    date: '2022-12-31',
    value: '3886.0',
  },
  {
    date: '2023-01-31',
    value: '3268.0',
  },
  {
    date: '2023-02-28',
    value: '4087.0',
  },
  {
    date: '2023-03-08',
    value: '2364.0',
  },
]
