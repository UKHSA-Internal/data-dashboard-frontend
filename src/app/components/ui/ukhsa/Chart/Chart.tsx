/* eslint-disable @next/next/no-img-element */
import { Suspense } from 'react'

import { ChartComponentData } from '@/api/models/cms/Page'
import { DataClassification } from '@/api/models/DataClassification'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { getServerTranslation } from '@/app/i18n'
import { getChartResponseData, getChartSvg } from '@/app/utils/chart.utils'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'
import ChartInteractive from './ChartInteractive'
import ChartWithFilter from './ChartWithFilter'

export type ChartSizes = Array<
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

interface ChartProps {
  /**
   * Enables interactive chart rendering with Plotly.js if set to true.
   * Defaults to true. When disabled or unavailable, static charts will display instead.
   */
  readonly enableInteractive?: boolean

  /**
   * Chart configuration data containing metadata required to fetch chart visuals
   * from the API. This data must conform to the CMS models for the specific chart types.
   */
  /* Request metadata from the CMS required to fetch from the headlines api */
  readonly data: ChartComponentData

  /**
   * Defines the responsive display sizes for the chart, allowing fallback to a
   * `default` chart if no minWidth breakpoint is met.
   * Each entry either specifies `minWidth` for a responsive breakpoint or `default`
   * for the default chart display. `size` controls the width format for each entry.
   *
   */
  readonly sizes: ChartSizes

  /**
   * True when chart contains public data
   * */
  isPublic?: boolean

  /**
   * Data classification, eg "OFFICIAL SENSITIVE"
   * */
  dataClassification?: DataClassification
}

const createStaticChart = async ({
  chart,
  areaName,
  altText,
}: {
  chart: Awaited<ReturnType<typeof getCharts>>
  areaName: string | null
  altText: string
}) => {
  const chartSvg = chart.data?.chart

  if (!chartSvg) return <ChartEmpty resetHref={await getPathname()} />

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

export async function Chart({
  data,
  sizes,
  enableInteractive = true,
  isPublic = true,
  dataClassification = undefined,
}: ChartProps) {
  const { t } = await getServerTranslation('common')

  const pathname = await getPathname()
  const [areaType, areaName] = await getAreaSelector()

  const chartResponse = await getChartResponseData(data, areaType, areaName, sizes, isPublic, dataClassification)

  if (!chartResponse?.success || !chartResponse?.data) {
    return <ChartEmpty resetHref={pathname} />
  }

  const { alt_text: alt, figure, last_updated } = chartResponse.data

  const staticChart = await createStaticChart({
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
            chartData={data}
            isPublic={isPublic}
            dataClassification={dataClassification}
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
