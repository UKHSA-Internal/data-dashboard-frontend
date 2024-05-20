import { type HealthAlertList } from '@/api/models/Alerts'

export const heatAlertsFixture: HealthAlertList = [
  { geography_code: 'E12000001', geography_name: 'North East', status: 'RED' },
  { geography_code: 'E12000002', geography_name: 'North West', status: 'RED' },
  { geography_code: 'E12000003', geography_name: 'Yorkshire and The Humber', status: 'AMBER' },
  { geography_code: 'E12000004', geography_name: 'East Midlands', status: 'GREEN' },
  { geography_code: 'E12000005', geography_name: 'West Midlands', status: 'GREEN' },
  { geography_code: 'E12000006', geography_name: 'East of England', status: 'GREEN' },
  { geography_code: 'E12000007', geography_name: 'London', status: 'GREEN' },
  { geography_code: 'E12000008', geography_name: 'South East', status: 'GREEN' },
  { geography_code: 'E12000009', geography_name: 'South West', status: 'GREEN' },
]
