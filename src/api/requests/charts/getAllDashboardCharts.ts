import { TopicName } from '../stats/getStats'
import { getCharts } from './v2/getCharts'

/**
 * This function orchestrates together the various chart API calls required to display
 * the relevant charts on the dashboard home page.
 */
export const getAllDashboardCharts = async () => {
  const [Cases, Deaths, Healthcare, Testing] = await Promise.all([
    getCharts({
      metric: 'new_cases_daily',
      topic: 'COVID-19',
      chart_type: 'line_with_shaded_section',
    }),
    getCharts({
      metric: 'new_deaths_daily',
      topic: 'COVID-19',
      chart_type: 'line_with_shaded_section',
    }),
    getCharts({
      metric: 'weekly_hospital_admissions_rate',
      topic: 'Influenza',
      chart_type: 'line_with_shaded_section',
    }),
    getCharts({
      metric: 'weekly_positivity',
      topic: 'Influenza',
      chart_type: 'line_with_shaded_section',
    }),
  ])

  const charts: Record<TopicName, Record<string, string>> = {
    Coronavirus: {
      Cases,
      Deaths,
    },
    Influenza: {
      Healthcare,
      Testing,
    },
  }

  return charts
}
