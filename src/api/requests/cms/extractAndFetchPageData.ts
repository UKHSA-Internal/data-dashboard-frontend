import { Body } from '@/api/models/cms/Page'
import { getHeadlines } from '@/api/requests/headlines/getHeadlines'
import { getTabular } from '@/api/requests/tabular/getTabular'
import { getTrends } from '@/api/requests/trends/getTrends'

import { getCharts } from '../charts/getCharts'

/**
 * Specific CMS page types (Home, Topics) are modelled to return parameters allowing the consumer to fetch
 * various types of data from external services (trends, headlines, charts etc)
 *
 * This function parses the CMS page, finds all relevant request parameters and synchronously initiates the requests
 * Due to low AWS resources, batching the requests asyncronously will cause HTTP 504 timeouts
 */
type Trends = Array<[string, Awaited<ReturnType<typeof getTrends>>]>
type Headlines = Array<[string, Awaited<ReturnType<typeof getHeadlines>>]>
type Charts = Array<[string, Awaited<ReturnType<typeof getCharts>>]>
type Tabular = Array<[string, Awaited<ReturnType<typeof getTabular>>]>

export const extractAndFetchPageData = async (body: Body) => {
  // Store requests as a tuple containing an id and request object
  const trends: Trends = []
  const headlines: Headlines = []
  const charts: Charts = []
  const tabular: Tabular = []

  // Extract all request data from the CMS content types for each topic
  for (const section of body) {
    for (const content of section.value.content) {
      if (content.type === 'chart_row_card') {
        for (const column of content.value.columns) {
          if (column.type === 'chart_with_headline_and_trend_card' || column.type === 'chart_card') {
            const { chart } = column.value

            // Calculate the chart size based on the number of columns (max num of 2)
            const chartSize = content.value.columns.length === 1 ? 'wide' : 'narrow'

            // Pick out plots
            const plots = chart.map((plots) => plots.value)

            // Extract the charts & tabular requests
            charts.push([`${column.id}-charts`, await getCharts(plots, chartSize)])
            tabular.push([`${column.id}-tabular`, await getTabular(plots)])
          }

          if (column.type === 'chart_with_headline_and_trend_card') {
            const { headline_number_columns: headlineColumns } = column.value

            for (const headline of headlineColumns) {
              if (headline.type === 'headline_number') {
                const { topic, metric } = headline.value
                headlines.push([`${headline.id}-headlines`, await getHeadlines({ topic, metric })])
              }
              if (headline.type === 'trend_number') {
                const { topic, metric, percentage_metric } = headline.value
                trends.push([`${headline.id}-trends`, await getTrends({ topic, metric, percentage_metric })])
              }
              if (headline.type === 'percentage_number') {
                const { topic, metric } = headline.value
                headlines.push([`${headline.id}-percentages`, await getHeadlines({ topic, metric })])
              }
            }
          }
        }
      }

      if (content.type === 'headline_numbers_row_card') {
        const { columns } = content.value
        for (const column of columns) {
          for (const row of column.value.rows) {
            if (row.type === 'headline_number') {
              headlines.push([`${row.id}-headlines`, await getHeadlines(row.value)])
            }
            if (row.type === 'trend_number') {
              trends.push([`${row.id}-trends`, await getTrends(row.value)])
            }
            if (row.type === 'percentage_number') {
              headlines.push([`${row.id}-percentages`, await getHeadlines(row.value)])
            }
          }
        }
      }
    }
  }

  const pageData = {
    trends: formatResponseToObject(trends),
    headlines: formatResponseToObject(headlines),
    charts: formatResponseToObject(charts),
    tabular: formatResponseToObject(tabular),
  }

  return pageData
}

/**
 * Utility function to build & return an object with the key being the identifier and the value being the response
 */
function formatResponseToObject<T>(requestMaps: Array<[string, T]>) {
  return requestMaps.reduce((accumulator, [requestId, response]) => {
    accumulator[requestId] = response
    return accumulator
  }, {} as Record<string, T>)
}
