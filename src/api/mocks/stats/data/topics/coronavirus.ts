import { Statistics } from '@/api/requests/stats/getStats'

export const coronavirusStatsMock: Statistics = [
  {
    topic: 'COVID-19',
    text: 'New cases in last 7 days',
    metric_name: 'new_cases_7days_sum',
    geography_type: 'nation',
    geography: 'England',
    stratum: 'default',
    sex: 'all',
    metric_value: '20629892',
    main_container: 'Cases',
    secondary_container: 'Weekly',
  },
  {
    topic: 'COVID-19',
    text: 'New deaths in last 7 days',
    metric_name: 'new_deaths_7days_sum',
    geography_type: 'nation',
    geography: 'England',
    stratum: 'default',
    sex: 'all',
    metric_value: '393',
    main_container: 'Deaths',
    secondary_container: 'Weekly',
  },
]
