import { z } from 'zod'
import { Chart, HeadlineWithNumber, HeadlineWithTrend, PageBody } from '@/api/models/cms/Page'
import { getTrends, responseSchema as trendsResponseSchema } from '@/api/requests/trends/getTrends'
import { getHeadlines, responseSchema as headlinesResponseSchema } from '@/api/requests/headlines/getHeadlines'
import { getCharts } from '../charts/getCharts'
import { isFulfilled } from '@/api/api-utils'

type ChartsResponse = Awaited<ReturnType<typeof getCharts>>

type HeadlinesResponse =
  | z.SafeParseSuccess<z.infer<typeof headlinesResponseSchema>>
  | z.SafeParseError<z.infer<typeof headlinesResponseSchema>>

type TrendsResponse =
  | z.SafeParseSuccess<z.infer<typeof trendsResponseSchema>>
  | z.SafeParseError<z.infer<typeof trendsResponseSchema>>

type RequestKey = Chart[] | HeadlineWithNumber | HeadlineWithTrend
type ResponseValue = Promise<ChartsResponse | HeadlinesResponse | TrendsResponse>

// We use the entire object of parameters as a unique, identifable key
// This key then maps to the resolved api response
type ResponseMap = Array<[RequestKey, ResponseValue]>

/**
 * Specific CMS page types (Home, Topics) are modelled to return parameters allowing the consumer to fetch
 * various types of data from external services (trends, headlines, charts etc)
 *
 * This function parses the CMS page, finds all relevant request parameters and initiates the requests
 * before finally returning all resolved data in the form of Zod success or error states.
 *
 */
export const extractAndFetchPageData = async (body: PageBody[]) => {
  try {
    // Store requests ready to be asyncronously called later
    const requestsMap: ResponseMap = []

    // Extract all requests from the CMS page model
    for (const section of body) {
      if (section.type === 'chart_with_headline_and_trend_card') {
        const { chart, headline_number_columns: columns } = section.value

        // Pick out charts
        requestsMap.push([
          chart,
          getCharts({
            plots: chart.map((plots) => plots.value),
          }),
        ])

        for (const column of columns) {
          // Pick out headlines
          if (column.type === 'headline_number') {
            const { topic, metric } = column.value
            requestsMap.push([column.value, getHeadlines({ topic, metric })])
          }

          // Pick out trends
          if (column.type === 'trend_number') {
            const { topic, metric, percentage_metric } = column.value
            requestsMap.push([column.value, getTrends({ topic, metric, percentage_metric })])
          }
        }
      }

      if (section.type === 'headline_numbers_row_card') {
        const { columns } = section.value
        for (const column of columns) {
          // Pick out headlines and trends from the row card
          if (column.type === 'headline_and_trend_component') {
            const { headline_number, trend_number } = column.value
            requestsMap.push([headline_number, getHeadlines(headline_number)])
            requestsMap.push([trend_number, getTrends(trend_number)])
          }
        }
      }
    }

    // Resolve all requests
    const results = await Promise.allSettled(requestsMap.map(([, request]) => request)).catch((err) => {
      console.log(err)
    })

    if (!Array.isArray(results)) return []

    // Merge the successful responses back into the stored requests
    const mergedResults = requestsMap.map(([key], idx) => {
      const result = results[idx]

      if (isFulfilled(result)) {
        return [key, result.value]
      }

      // If any responses haven't resolved, then return an unsuccessful state
      return [key, { success: false }]
    })

    return mergedResults
  } catch (error) {
    return []
    console.log(error)
  }
}
