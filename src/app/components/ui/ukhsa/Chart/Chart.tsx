/* eslint-disable @next/next/no-img-element */
import kebabCase from 'lodash/kebabCase'
import { Suspense } from 'react'
import { z } from 'zod'

import { ChartCardSchemas } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { getServerTranslation } from '@/app/i18n'
import { getChartSvg, getChartTimespan, getFilteredData } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'
import { ChartNoScript } from '../ChartNoScript/ChartNoScript'
import ChartSelect from '../View/ChartSelect/ChartSelect'
import ChartInteractive from './ChartInteractive'

interface ChartProps {
  /**
   * Enables interactive chart rendering with Plotly.js if set to true.
   * Defaults to true. When disabled or unavailable, static charts will display instead.
   */
  enableInteractive?: boolean

  /**
   * Chart configuration data containing metadata required to fetch chart visuals
   * from the API. This data must conform to the CMS models for the specific chart types.
   */
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof ChartCardSchemas>['value']

  /**
   * Defines the responsive display sizes for the chart, allowing fallback to a
   * `default` chart if no minWidth breakpoint is met.
   * Each entry either specifies `minWidth` for a responsive breakpoint or `default`
   * for the default chart display. `size` controls the width format for each entry.
   *
   */
  sizes: Array<
    | {
        default?: never
        minWidth: number
        size: 'narrow' | 'wide' | 'half' | 'third'
      }
    | {
        default: true
        minWidth?: never
        size: 'narrow' | 'wide' | 'half' | 'third'
      }
  >

  /**
   * Defines the value of the URL parameter 'timeseriesFilter' for use in filtering chart data
   * Defaults to show all content if no filter present
   */
  timeseriesFilter: string

  /**
   * The ID of the chart card for use in filtering chart data
   */
  chartId: string
}

const createStaticChart = ({
  sizes,
  charts,
  areaName,
  altText,
}: {
  sizes: ChartProps['sizes']
  charts: Awaited<ReturnType<typeof getCharts>>[]
  areaName: string | null
  altText: string
}) => {
  return (
    <picture data-testid="chart" data-location={areaName}>
      {sizes.map((size, index) => {
        const chartSvg = charts[index].data?.chart

        if (chartSvg) {
          if (size.minWidth) {
            return (
              <source
                key={index}
                media={`(min-width: ${size.minWidth}px)`}
                srcSet={`data:image/svg+xml;utf8,${getChartSvg(chartSvg)}`}
                data-testid={`chart-src-min-${size.minWidth}`}
              />
            )
          }

          if (size.default) {
            return (
              <img
                key={index}
                alt={altText}
                src={`data:image/svg+xml;utf8,${getChartSvg(chartSvg)}`}
                className="w-full"
              />
            )
          }
        }
      })}
    </picture>
  )
}

export async function Chart({ data, sizes, enableInteractive = true, timeseriesFilter, chartId }: ChartProps) {
  const { t } = await getServerTranslation('common')

  let chartData = data

  if (timeseriesFilter) {
    // Nullcheck
    const filteredData = getFilteredData(data, timeseriesFilter, chartId)?.filter(
      (item): item is NonNullable<typeof item> => item !== null
    )

    if (filteredData) {
      chartData = {
        ...data,
        chart: filteredData,
      }
    }
  }

  let yAxisMinimum = null
  let yAxisMaximum = null
  let xAxisTitle = ''
  let yAxisTitle = ''

  if ('y_axis_minimum_value' in chartData) {
    yAxisMinimum = chartData.y_axis_minimum_value
  }
  if ('y_axis_maximum_value' in chartData) {
    yAxisMaximum = chartData.y_axis_maximum_value
  }
  if ('x_axis_title' in chartData) {
    xAxisTitle = chartData.x_axis_title || ''
  }
  if ('y_axis_title' in chartData) {
    yAxisTitle = chartData.y_axis_title || ''
  }

  const { chart, x_axis, y_axis } = chartData

  const pathname = getPathname()
  const [areaType, areaName] = await getAreaSelector()

  const plots = chart.map((plot) => ({
    ...plot?.value,

    geography_type: areaType ?? plot?.value.geography_type,
    geography: areaName ?? plot?.value.geography,
  }))

  const chartRequestBody = {
    plots,
    x_axis,
    y_axis,
    x_axis_title: xAxisTitle,
    y_axis_title: yAxisTitle,
    y_axis_maximum_value: yAxisMaximum,
    y_axis_minimum_value: yAxisMinimum,
  }

  const requests =
    plots &&
    sizes.map((chart) =>
      getCharts({
        ...chartRequestBody,
        chart_width: chartSizes[chart.size].width,
        chart_height: chartSizes[chart.size].height,
      })
    )

  const resolvedRequests = await Promise.all(requests)

  // Pick out the default chart (mobile-first)
  const defaultChartResponse = resolvedRequests[resolvedRequests.length - 1].data

  // Check the default chart & any additional charts have correctly returned responses
  if (!defaultChartResponse || resolvedRequests.some((request) => !request.success)) {
    return <ChartEmpty resetHref={pathname} />
  }

  const { alt_text: alt, figure } = defaultChartResponse

  const staticChart = createStaticChart({
    sizes,
    charts: resolvedRequests,
    areaName,
    altText: t('cms.blocks.chart.alt', {
      body: alt,
    }),
  })

  // Return static charts locally as our mocks don't currently provide the plotly layout & data json.
  // Update the mocks to include this, and then remove the below condition to enable interactive charts locally.
  if (!process.env.API_URL.includes('ukhsa-dashboard.data.gov.uk') && !process.env.API_URL.includes('localhost:8000')) {
    return (
      <>
        {data.show_timeseries_filter && <ChartSelect timespan={getChartTimespan(data.chart)} chartId={chartId} />}
        {staticChart}
      </>
    )
  }

  // Show static chart when interactive charts are disabled (i.e. landing page)
  if (!enableInteractive) return staticChart

  return (
    <>
      {data.show_timeseries_filter && <ChartSelect timespan={getChartTimespan(data.chart)} chartId={chartId} />}
      <Suspense fallback={staticChart}>
        <ChartInteractive staticChart={staticChart} figure={{ frames: [], ...figure }} />
      </Suspense>
      {data.show_timeseries_filter && <ChartNoScript title={kebabCase(data.title)} />}
    </>
  )
}
