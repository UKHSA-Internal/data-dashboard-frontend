import { type HealthAlert } from '@/api/models/Alerts'

export const alertRegionFixture: HealthAlert = {
  status: 'Green',
  text: '<p>Severe impacts are expected across the health and social care sector due to forecast weather conditions, including:</p><ul><li>increased risk of mortality across the whole population with significant mortality observed in older age groups; significant increased demand on all health and social care services</li><li>impact on delivery of services due to poor weather conditions and staff access</li><li>maintaining indoor temperatures at recommended 18°c may become challenging for some, leading to increased risk of vulnerable people</li><li>national critical infrastructure failures – generators, power outages, gas supplies etc.</li></ul>',
  period_start: '2024-05-06 12:00:00',
  period_end: '2024-05-08 12:00:00',
  refresh_date: '2024-05-07 12:00:00',
  geography_name: '',
  geography_code: '',
}
