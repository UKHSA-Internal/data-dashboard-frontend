import { getStatsApiPath, requestOptions } from '../helpers'

/**
 * API Response Types
 */
export type GetStatisticsResponse = Statistic[]

type Container = 'Cases' | 'Deaths' | 'Healthcare' | 'Testing' | 'Vaccinations'
export interface Statistic {
  panel: 'Headline' | 'Tile'
  main_container: Container
  secondary_container:
    | 'arrow'
    | 'colour'
    | 'percentage_change'
    | 'change'
    | 'Weekly'
    | 'Last 7 days'
    | 'Patients admitted'
    | 'Spring Booster'
    | 'Summer Booster'
    | 'Virus tests positivity (%)'
    | 'People tested positive in England'
    | 'Deaths with COVID-19 on the death Certificate in England'
    | 'Virus tests reported'
    | 'Weekly hospital admission rates for Influenza'
    | 'Weekly positivity by age'
  metric_value?: string | 'green' | 'red' | 'up' | 'down' | 'no_value' | 'neutral'
}

/**
 * Transformation types
 */
type TextContentType = {
  type: 'text'
  heading: string
  value: string
}

type TrendContentType = {
  type: 'trend'
  heading: string
  change: string
  percentage: string
  direction: string
  colour: string
}

export type ContentTypes = TextContentType | TrendContentType

type ContentTypeContainer = Array<{ container: Container; content: Array<ContentTypes> }>

/**
 *
 * This transformer reconstructs the stats API response into a format that is usable within our UI.
 * Using the headings provided in the response (found in the secondary_key property) we can map relevant items
 * into their distinctive UI sections i.e. summary or tiles. Based on the secondary_key we can also determine
 * which UI content type is to be displayed (either a textual heading/value pair or a trend component)
 *
 * The idea is to turn the flat list structure the API gives us into an object:
 *  {
 *    summary: [{ container: 'Cases', content: [{ type: 'text', heading: 'Weekly', value: '24,298' }] }],
 *    tiles: [{ container: 'Cases', content: [...] }, { container: 'Deaths', content: [...] }]
 *  }
 */
const transformResponse = (stats: GetStatisticsResponse) => {
  const summary: ContentTypeContainer = []
  const tiles: ContentTypeContainer = []

  /**
   * Extract the summary and tile containers ids as unique lists
   * e.g. ['Cases', 'Deaths', 'Healthcare', 'Vacinations', 'Testing']
   */
  const summaryContainers = [
    ...new Set(stats.filter((stat) => stat.panel === 'Headline').map((stat) => stat.main_container)),
  ]

  const tileContainers = [...new Set(stats.filter((stat) => stat.panel === 'Tile').map((stat) => stat.main_container))]

  /**
   * The UI displays two types of content
   *
   *  - Text component with a heading/value
   *  - Trend component with a visual sentiment (up or down arrow in a green or red colour)
   *
   * The following secondary keys are associated with these two types
   */
  const contentTypeIds = {
    summary: {
      text: [
        'Weekly',
        'Patients admitted',
        'Spring Booster',
        'Summer Booster',
        'Virus tests positivity (%)',
        'People tested positive in England',
        'Deaths with COVID-19 on the death Certificate in England',
        'Virus tests reported',
      ],
      trend: ['Last 7 days', 'percentage_change', 'change', 'colour', 'arrow'],
    },
    tiles: {
      text: [
        'Weekly',
        'Patients Admitted',
        'Spring Booster',
        'Summer Booster',
        'Virus tests positivity (%)',
        'People tested positive in England',
        'Deaths with COVID-19 on the death Certificate in England',
        'Last 7 days',
        'Weekly hospital admission rates for Influenza',
        'Weekly positivity by age',
      ],
      trend: ['percentage_change', 'change', 'colour', 'arrow'],
    },
  }

  summaryContainers.forEach((container) => {
    const content: Array<ContentTypes> = []

    const textItems = stats.filter(
      (stat) =>
        stat.panel === 'Headline' &&
        stat.main_container === container &&
        contentTypeIds.summary.text.includes(stat.secondary_container)
    )

    if (textItems.length) {
      textItems.forEach((item) => {
        content.push({
          type: 'text',
          heading: item.secondary_container,
          value: item.metric_value ?? '',
        })
      })
    }

    const trendItems = stats.filter(
      (stat) =>
        stat.panel === 'Headline' &&
        stat.main_container === container &&
        contentTypeIds.summary.trend.includes(stat.secondary_container)
    )

    if (trendItems.length) {
      const trend: TrendContentType = {
        type: 'trend',
        heading: '',
        change: '',
        percentage: '',
        direction: '',
        colour: '',
      }

      trendItems.forEach((item) => {
        if (item.secondary_container === 'percentage_change') {
          trend.percentage = item.metric_value ?? ''
        }

        if (item.secondary_container === 'Last 7 days' || item.secondary_container === 'change') {
          trend.heading = item.secondary_container === 'change' ? '' : item.secondary_container
          trend.change = item.metric_value ?? ''
        }

        if (item.secondary_container === 'arrow') {
          trend.direction = item.metric_value ?? ''
        }

        if (item.secondary_container === 'colour') {
          trend.colour = item.metric_value ?? ''
        }
      })

      content.push(trend)
    }

    summary.push({
      container,
      content,
    })
  })

  tileContainers.forEach((container) => {
    const content: Array<ContentTypes> = []

    const textItems = stats.filter(
      (stat) =>
        stat.panel === 'Tile' &&
        stat.main_container === container &&
        contentTypeIds.tiles.text.includes(stat.secondary_container)
    )

    if (textItems.length) {
      textItems.forEach((item) => {
        content.push({
          type: 'text',
          heading: item.secondary_container,
          value: item.metric_value ?? '',
        })
      })
    }

    const trendItems = stats.filter(
      (stat) =>
        stat.panel === 'Tile' &&
        stat.main_container === container &&
        contentTypeIds.tiles.trend.includes(stat.secondary_container)
    )

    if (trendItems.length) {
      const trend: TrendContentType = {
        type: 'trend',
        heading: '',
        change: '',
        percentage: '',
        direction: '',
        colour: '',
      }

      trendItems.forEach((item) => {
        if (item.secondary_container === 'percentage_change') {
          trend.percentage = item.metric_value ?? ''
        }

        if (item.secondary_container === 'Last 7 days' || item.secondary_container === 'change') {
          trend.heading = item.secondary_container === 'change' ? '' : item.secondary_container
          trend.change = item.metric_value ?? ''
        }

        if (item.secondary_container === 'arrow') {
          trend.direction = item.metric_value ?? ''
        }

        if (item.secondary_container === 'colour') {
          trend.colour = item.metric_value ?? ''
        }
      })

      content.push(trend)
    }

    tiles.push({
      container,
      content,
    })
  })

  return {
    summary,
    tiles,
  }
}

export type GetStatsRequestParams = 'COVID-19' | 'Influenza'

export type TopicName = 'Coronavirus' | 'Influenza'

export const getStats = async (
  topic: GetStatsRequestParams
): Promise<{ topic: TopicName } & ReturnType<typeof transformResponse>> => {
  const req = await fetch(`${getStatsApiPath()}/${topic}`, requestOptions)
  const res = await req.json()

  if (!req.ok) throw new Error(res.detail)

  const data = transformResponse(res)

  const topicName: TopicName = topic === 'COVID-19' ? 'Coronavirus' : topic

  return {
    topic: topicName,
    ...data,
  }
}
