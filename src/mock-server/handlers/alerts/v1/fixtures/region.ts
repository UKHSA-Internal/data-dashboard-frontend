import { faker } from '@faker-js/faker'

import { type HealthAlert } from '@/api/models/Alerts'

export const alertRegionFixture: HealthAlert = {
  status: 'Green',
  text: faker.lorem.paragraphs(),
  period_start: '2024-05-06 12:00:00',
  period_end: '2024-05-08 12:00:00',
  refresh_date: '2024-05-07 12:00:00',
  geography_name: '',
  geography_code: '',
}
