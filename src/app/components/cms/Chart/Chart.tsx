import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard, WithSimplifiedChartCardAndLink } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { flags } from '@/app/constants/flags.constants'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { getServerTranslation } from '@/app/i18n'
import { getChartSvg } from '@/app/utils/chart.utils'
import { getFeatureFlag } from '@/app/utils/flags.utils'
import { chartSizes } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'

interface ChartProps {
  /* Enable interactive plotly.js */
  enableInteractive?: boolean

  /* Request metadata from the CMS required to fetch from the headlines api */
  data:
    | z.infer<typeof WithChartHeadlineAndTrendCard>['value']
    | z.infer<typeof WithChartCard>['value']
    | z.infer<typeof WithSimplifiedChartCardAndLink>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout, or half/third layouts for landiing page  */
  size: 'narrow' | 'wide' | 'half' | 'third'
}

const createStaticChart = ({
  size,
  charts: { wideChart, halfChart, thirdChart, narrowChart },
  areaName,
  altText,
}: {
  size: ChartProps['size']
  charts: Record<string, string>
  areaName: string | null
  altText: string
}) => {
  const onLandingPage = size === 'third' || size === 'half'

  return (
    <picture data-testid="chart" data-location={areaName}>
      {size === 'wide' && (
        <source
          media="(min-width: 768px)"
          srcSet={`data:image/svg+xml;utf8,${getChartSvg(wideChart)}`}
          data-testid="chart-src-min-768"
        />
      )}
      {size === 'half' && (
        <source
          media="(min-width: 1200px)"
          srcSet={`data:image/svg+xml;utf8,${getChartSvg(halfChart)}`}
          data-testid="chart-src-min-1200"
        />
      )}
      <img
        alt={altText}
        src={`data:image/svg+xml;utf8,${getChartSvg(onLandingPage ? thirdChart : narrowChart)}`}
        className="w-full"
      />
    </picture>
  )
}

export async function Chart({ data, size, enableInteractive = true }: ChartProps) {
  const [{ enabled: interactiveChartsFlagEnabled }, { t }] = await Promise.all([
    getFeatureFlag(flags.interactiveCharts),
    getServerTranslation('common'),
  ])

  const { chart, x_axis, y_axis } = data

  const pathname = getPathname()
  const [areaType, areaName] = getAreaSelector()

  const plots = chart.map((plot) => ({
    ...plot.value,
    geography_type: areaType ?? plot.value.geography_type,
    geography: areaName ?? plot.value.geography,
  }))

  const request = (chart_width: number, chart_height: number) =>
    getCharts({ plots, x_axis, y_axis, chart_width, chart_height })

  // Collect all chart svg's for all desired sizes
  const topicPageRequests = [
    request(chartSizes.narrow.width, chartSizes.narrow.height),
    request(chartSizes.wide.width, chartSizes.wide.height),
  ]

  const landingPageRequests = [
    request(chartSizes.third.width, chartSizes.third.height),
    request(chartSizes.half.width, chartSizes.half.height),
  ]

  const [narrowChartResponse, wideChartResponse] = await Promise.all(topicPageRequests)
  const [thirdChartResponse, halfChartResponse] = await Promise.all(landingPageRequests)

  if (
    !narrowChartResponse.success ||
    !wideChartResponse.success ||
    !thirdChartResponse.success ||
    !halfChartResponse.success
  ) {
    return <ChartEmpty resetHref={pathname} />
  }

  const {
    data: { alt_text: alt, figure },
  } = narrowChartResponse

  const staticChart = createStaticChart({
    size,
    charts: {
      wideChart: wideChartResponse.data.chart,
      thirdChart: thirdChartResponse.data.chart,
      halfChart: halfChartResponse.data.chart,
      narrowChart: narrowChartResponse.data.chart,
    },
    areaName,
    altText: t('cms.blocks.chart.alt', { body: alt }),
  })

  // Lazy load the interactive chart component (and all associated plotly.js code)
  const ChartInteractive = dynamic(() => import('../ChartInteractive/ChartInteractive'), {
    ssr: false,
    loading: () => staticChart, // Show the static svg chart whilst this chunk is being loaded
  })

  // Return static charts locally as our mocks don't currently provide the plotly layout & data json.
  // Update the mocks to include this, and then remove the below condition to enable interactive charts locally.
  if (!process.env.API_URL.includes('ukhsa-dashboard.data.gov.uk')) {
    return staticChart
  }

  // Show static chart when interactive charts are disabled (i.e. landing page) or when feature flag is off
  if (!enableInteractive || !interactiveChartsFlagEnabled) {
    return staticChart
  }

  return (
    <Suspense fallback={staticChart}>
      <ChartInteractive fallbackUntilLoaded={staticChart} figure={{ frames: [], ...figure }} />
    </Suspense>
  )
}
