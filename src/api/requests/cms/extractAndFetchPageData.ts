import { Body } from '@/api/models/cms/Page'
import { getTrends } from '@/api/requests/trends/getTrends'
import { getHeadlines } from '@/api/requests/headlines/getHeadlines'
import { getCharts } from '../charts/getCharts'
import { isFulfilled } from '@/api/api-utils'

/**
 * Specific CMS page types (Home, Topics) are modelled to return parameters allowing the consumer to fetch
 * various types of data from external services (trends, headlines, charts etc)
 *
 * This function parses the CMS page, finds all relevant request parameters and asyncronously initiates the requests
 */
type Trends = Array<[string, ReturnType<typeof getTrends>]>
type Headlines = Array<[string, ReturnType<typeof getHeadlines>]>
type Charts = Array<[string, ReturnType<typeof getCharts>]>

export const extractAndFetchPageData = async (body: Body[]) => {
  // Store requests as a tuple containing an id and request object
  const trends: Trends = []
  const headlines: Headlines = []
  const charts: Charts = []

  // Extract all requests from the CMS page model
  for (const section of body) {
    if (section.type === 'chart_with_headline_and_trend_card') {
      const { chart, headline_number_columns: columns } = section.value

      // Pick out charts
      charts.push([
        `${section.id}-charts`,
        getCharts({
          plots: chart.map((plots) => plots.value),
        }),
      ])

      for (const column of columns) {
        // Pick out headlines
        if (column.type === 'headline_number') {
          const { topic, metric } = column.value
          headlines.push([`${column.id}-headlines`, getHeadlines({ topic, metric })])
        }

        // Pick out trends
        if (column.type === 'trend_number') {
          const { topic, metric, percentage_metric } = column.value
          trends.push([`${column.id}-trends`, getTrends({ topic, metric, percentage_metric })])
        }
      }
    }

    if (section.type === 'headline_numbers_row_card') {
      const { columns } = section.value
      for (const column of columns) {
        // Pick out headlines and trends from the row card
        if (column.type === 'headline_and_trend_component') {
          const { headline_number, trend_number } = column.value
          headlines.push([`${column.id}-headlines`, getHeadlines(headline_number)])
          trends.push([`${column.id}-trends`, getTrends(trend_number)])
        }
        if (column.type === 'dual_headline_component') {
          const { top_headline_number, bottom_headline_number } = column.value
          headlines.push([`${column.id}-headline-top`, getHeadlines(top_headline_number)])
          headlines.push([`${column.id}-headline-bottom`, getHeadlines(bottom_headline_number)])
        }
        if (column.type === 'single_headline_component') {
          const { headline_number } = column.value
          headlines.push([`${column.id}-headlines`, getHeadlines(headline_number)])
        }
      }
    }
  }

  const pageData = {
    trends: await resolveRequests(trends),
    headlines: await resolveRequests(headlines),
    charts: await resolveRequests(charts),
  }

  return pageData
}

/**
 * Utility function to fire multiple async requests, check if they've settled as
 * fulfilled or rejected, and then form an appropriate response for the UI
 */
type ResolvedResponse<T> = Record<string, T | { success: false }>

async function resolveRequests<T>(requestMaps: Array<[string, Promise<T>]>) {
  // Pick out the requests from the tuple & invoke asyncronously
  const results = await Promise.allSettled(requestMaps.map((requestMap) => requestMap[1]))

  // Build & return an object with the key being the identifier and the value being the response
  return requestMaps.reduce((accumulator, [requestId], index) => {
    const result = results[index]

    // Promise settled as fulfilled, return a success state
    if (isFulfilled(result)) {
      accumulator[requestId] = result.value
      return accumulator
    }

    // Promise settled rejected, return a failed state
    accumulator[requestId] = { success: false }

    return accumulator
  }, {} as ResolvedResponse<T>)
}
