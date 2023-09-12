import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getChartSvg } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

interface ChartProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value'] | z.infer<typeof WithChartCard>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

export async function Chart({ data, size }: ChartProps) {
  const { chart, x_axis, y_axis } = data

  const plots = chart.map((plot) => plot.value)

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
      <div className="govuk-!-margin-top-4 govuk-!-margin-bottom-6">
        <picture>
          {wideChart && (
            <source
              media="(min-width: 768px)"
              srcSet={`data:image/svg+xml;utf8,${getChartSvg(wideChart)}`}
              data-testid="chart-src-min-768"
            />
          )}
          <img alt="" src={`data:image/svg+xml;utf8,${getChartSvg(narrowChart)}`} className="w-full" />
        </picture>
      </div>
    )
  }

  return null
}
