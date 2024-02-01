import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { useAreaSelector } from '@/app/hooks/useAreaSelector'
import { usePathname } from '@/app/hooks/usePathname'
import { useTranslation } from '@/app/i18n'
import { getChartSvg } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'

interface ChartProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value'] | z.infer<typeof WithChartCard>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

export async function Chart({ data, size }: ChartProps) {
  const { t } = await useTranslation('common')
  const { chart, x_axis, y_axis } = data

  const pathname = usePathname()
  const [areaType, areaName] = useAreaSelector()

  const plots = chart.map((plot) => ({
    ...plot.value,
    geography_type: areaType ?? plot.value.geography_type,
    geography: areaName ?? plot.value.geography,
  }))

  // Collect all chart svg's mobile first using the narrow aspect ratio
  const chartRequests = [
    getCharts({
      plots,
      x_axis,
      y_axis,
      chart_width: chartSizes.narrow.width,
      chart_height: chartSizes.narrow.height,
    }),
  ]

  // The concept of a "wide" chart only applies to the desktop viewport
  if (size === 'wide') {
    chartRequests.push(
      getCharts({
        plots,
        x_axis,
        y_axis,
        chart_width: chartSizes.wide.width,
        chart_height: chartSizes.wide.height,
      })
    )
  }

  const [narrowChartResponse, wideChartResponse] = await Promise.all(chartRequests)

  if (narrowChartResponse.success) {
    const {
      data: { chart: narrowChart },
    } = narrowChartResponse

    const wideChart = wideChartResponse && wideChartResponse.success && wideChartResponse.data.chart

    return (
      <picture data-testid="chart" data-location={areaName}>
        {wideChart && (
          <source
            media="(min-width: 768px)"
            srcSet={`data:image/svg+xml;utf8,${getChartSvg(wideChart)}`}
            data-testid="chart-src-min-768"
          />
        )}
        <img alt="" src={`data:image/svg+xml;utf8,${getChartSvg(narrowChart)}`} className="w-full" />
      </picture>
    )
  }

  return (
    <ChartEmpty
      resetHref={pathname}
      labels={{
        description: t('areaSelector.noData', { areaName, context: areaName && 'withArea' }),
        reset: t('areaSelector.resetBtn'),
      }}
    />
  )
}
