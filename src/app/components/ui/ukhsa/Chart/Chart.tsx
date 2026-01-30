/* eslint-disable @next/next/no-img-element */
import { Suspense } from 'react'
import { z } from 'zod'

import { ChartCardSchemas } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { getServerTranslation } from '@/app/i18n'
import { getChartSvg } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'
import ChartInteractive from './ChartInteractive'
import ChartWithFilter from './ChartWithFilter'

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
}

const createStaticChart = ({
  chart,
  areaName,
  altText,
}: {
  chart: Awaited<ReturnType<typeof getCharts>>
  areaName: string | null
  altText: string
}) => {
  const chartSvg = chart.data?.chart

  if (!chartSvg) return <ChartEmpty resetHref={getPathname()} />

  return (
    <img
      data-testid="chart"
      data-location={areaName}
      alt={altText}
      src={`data:image/svg+xml;utf8,${getChartSvg(chartSvg)}`}
      className="w-full"
    />
  )
}

export async function Chart({ data, sizes, enableInteractive = true }: ChartProps) {
  const { t } = await getServerTranslation('common')

  const chartData = data

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

  const { chart, x_axis, y_axis, confidence_intervals, confidence_colour } = chartData

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
    confidence_intervals,
    confidence_colour,
    x_axis_title: xAxisTitle,
    y_axis_title: yAxisTitle,
    y_axis_maximum_value: yAxisMaximum,
    y_axis_minimum_value: yAxisMinimum,
  }

  // Select the default size (mobile-first approach)
  const selectedSize = sizes.slice().sort((a, b) => chartSizes[b.size].width - chartSizes[a.size].width)[0]

  // Make single chart request with selected size
  const chartResponse = await getCharts({
    ...chartRequestBody,
    chart_width: chartSizes[selectedSize.size].width,
    chart_height: chartSizes[selectedSize.size].height,
  })

  if (!chartResponse.success || !chartResponse.data) {
    return <ChartEmpty resetHref={pathname} />
  }

  const { alt_text: alt, figure, last_updated } = chartResponse.data

  const staticChart = createStaticChart({
    chart: chartResponse,
    areaName,
    altText: t('cms.blocks.chart.alt', {
      body: alt,
    }),
  })

  // Return static charts locally as our mocks don't currently provide the plotly layout & data json.
  // Update the mocks to include this, and then remove the below condition to enable interactive charts locally.
  if (!process.env.API_URL.includes('ukhsa-dashboard.data.gov.uk') && !process.env.API_URL.includes('localhost:8000')) {
    return staticChart
  }

  // Show static chart when interactive charts are disabled (i.e. landing page)
  if (!enableInteractive) return staticChart

  // Use client-side chart with filter when timeseries filter is enabled
  if (data.show_timeseries_filter) {
    return (
      <>
        <noscript>{staticChart}</noscript>
        {/* Interactive chart with filter - only visible when JavaScript is enabled */}
        <div className="hidden js:block">
          <ChartWithFilter
            lastUpdated={last_updated}
            figure={{ frames: [], ...figure }}
            title={data.title}
            chart={data.chart}
            chartData={chartData}
          />
        </div>
      </>
    )
  }

  return (
    <Suspense fallback={staticChart}>
      <ChartInteractive staticChart={staticChart} figure={{ frames: [], ...figure }} />
    </Suspense>
  )
}
