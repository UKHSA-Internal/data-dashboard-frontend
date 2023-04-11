import { TopicName } from '../stats/getStats'
import { getChart } from './getChart'

export const getAllDashboardCharts = async () => {
  // Initialise the charts with default values
  const charts: Record<TopicName, Record<string, string>> = {
    Coronavirus: {
      Cases: '',
      Deaths: '',
    },
    Influenza: {
      Healthcare: '',
      Testing: '',
    },
  }

  // Return the default values so the component knows to render a fallback
  // We render a fallback locally to prevent the real API from being hit and
  // reducing dev mode page load time
  if (process.env.NEXT_PUBLIC_USE_CHART_MOCKS === 'enabled') {
    return charts
  }

  // Otherwise, gather the real chart data from the API
  const [cases, deaths, healthcare, testing] = await Promise.all([
    getChart('COVID-19', 'Cases'),
    getChart('COVID-19', 'Deaths'),
    getChart('Influenza', 'Healthcare'),
    getChart('Influenza', 'Testing'),
  ])

  charts.Coronavirus.Cases = cases
  charts.Coronavirus.Deaths = deaths
  charts.Influenza.Healthcare = healthcare
  charts.Influenza.Testing = testing

  return charts
}
