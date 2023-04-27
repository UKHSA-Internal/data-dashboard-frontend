import { TopicName } from '../stats/getStats'
import { getCharts } from './getCharts'

/**
 * This function orchestrates together the various chart API calls required to display
 * the relevant charts on the dashboard home page.
 */
export const getAllDashboardCharts = async () => {
  const [cases, deaths, healthcare, testing] = await Promise.all([
    getCharts({
      plots: [
        {
          metric: 'new_cases_daily',
          topic: 'COVID-19',
          chart_type: 'line_with_shaded_section',
        },
      ],
    }),
    getCharts({
      plots: [
        {
          metric: 'new_deaths_daily',
          topic: 'COVID-19',
          chart_type: 'line_with_shaded_section',
        },
      ],
    }),
    getCharts({
      plots: [
        {
          metric: 'weekly_hospital_admissions_rate',
          topic: 'Influenza',
          chart_type: 'line_with_shaded_section',
        },
      ],
    }),
    getCharts({
      plots: [
        {
          metric: 'weekly_positivity_latest',
          topic: 'Influenza',
          chart_type: 'line_with_shaded_section',
        },
      ],
    }),
  ])

  const charts: Record<TopicName, Record<string, string>> = {
    Coronavirus: {
      Cases: cases.success ? cases.data : '',
      Deaths: deaths.success ? deaths.data : '',
    },
    Influenza: {
      Healthcare: healthcare.success ? healthcare.data : '',
      Testing: testing.success ? testing.data : '',
    },
  }

  return charts
}
