import { type HealthAlertList } from '@/api/models/Alerts'

const defaultData: HealthAlertList = [
  { geography_code: 'E12000001', geography_name: 'North East', status: 'Green', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000002', geography_name: 'North West', status: 'Green', refresh_date: '2024-05-07 12:00:00' },
  {
    geography_code: 'E12000003',
    geography_name: 'Yorkshire and The Humber',
    status: 'Green',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000004',
    geography_name: 'East Midlands',
    status: 'Green',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000005',
    geography_name: 'West Midlands',
    status: 'Green',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000006',
    geography_name: 'East of England',
    status: 'Green',
    refresh_date: '2024-05-07 12:00:00',
  },
  { geography_code: 'E12000007', geography_name: 'London', status: 'Green', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000008', geography_name: 'South East', status: 'Green', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000009', geography_name: 'South West', status: 'Green', refresh_date: '2024-05-07 12:00:00' },
]

const greenAlerts: HealthAlertList = defaultData

const redAmberGreenYellowAlerts: HealthAlertList = [
  { geography_code: 'E12000001', geography_name: 'North East', status: 'Red', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000002', geography_name: 'North West', status: 'Amber', refresh_date: '2024-05-07 12:00:00' },
  {
    geography_code: 'E12000003',
    geography_name: 'Yorkshire and The Humber',
    status: 'Yellow',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000004',
    geography_name: 'East Midlands',
    status: 'Yellow',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000005',
    geography_name: 'West Midlands',
    status: 'Green',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000006',
    geography_name: 'East of England',
    status: 'Green',
    refresh_date: '2024-05-07 12:00:00',
  },
  { geography_code: 'E12000007', geography_name: 'London', status: 'Green', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000008', geography_name: 'South East', status: 'Green', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000009', geography_name: 'South West', status: 'Green', refresh_date: '2024-05-07 12:00:00' },
]

const redAmberAlerts: HealthAlertList = [
  { geography_code: 'E12000001', geography_name: 'North East', status: 'Red', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000002', geography_name: 'North West', status: 'Red', refresh_date: '2024-05-07 12:00:00' },
  {
    geography_code: 'E12000003',
    geography_name: 'Yorkshire and The Humber',
    status: 'Red',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000004',
    geography_name: 'East Midlands',
    status: 'Red',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000005',
    geography_name: 'West Midlands',
    status: 'Red',
    refresh_date: '2024-05-07 12:00:00',
  },
  {
    geography_code: 'E12000006',
    geography_name: 'East of England',
    status: 'Amber',
    refresh_date: '2024-05-07 12:00:00',
  },
  { geography_code: 'E12000007', geography_name: 'London', status: 'Amber', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000008', geography_name: 'South East', status: 'Amber', refresh_date: '2024-05-07 12:00:00' },
  { geography_code: 'E12000009', geography_name: 'South West', status: 'Amber', refresh_date: '2024-05-07 12:00:00' },
]

const noAlertsYet: HealthAlertList = defaultData.map((region) => ({
  ...region,
  status: 'Green',
  refresh_date: null,
}))

export const fixtures = {
  Green: greenAlerts,
  RedAmberGreenYellow: redAmberGreenYellowAlerts,
  RedAmber: redAmberAlerts,
  NoAlertsYet: noAlertsYet,
}
