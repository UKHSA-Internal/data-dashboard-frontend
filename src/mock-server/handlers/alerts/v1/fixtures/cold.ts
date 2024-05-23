import { type HealthAlertList } from '@/api/models/Alerts'

export const coldAlertsFixture: HealthAlertList = [
  { geography_code: 'E12000001', geography_name: 'North East', status: 'Green' },
  { geography_code: 'E12000002', geography_name: 'North West', status: 'Green' },
  { geography_code: 'E12000003', geography_name: 'Yorkshire and The Humber', status: 'Green' },
  { geography_code: 'E12000004', geography_name: 'East Midlands', status: 'Green' },
  { geography_code: 'E12000005', geography_name: 'West Midlands', status: 'Green' },
  { geography_code: 'E12000006', geography_name: 'East of England', status: 'Green' },
  { geography_code: 'E12000007', geography_name: 'London', status: 'Green' },
  { geography_code: 'E12000008', geography_name: 'South East', status: 'Green' },
  { geography_code: 'E12000009', geography_name: 'South West', status: 'Green' },
]
