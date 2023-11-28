import { headers } from 'next/headers'
import Link from 'next/link'
import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { useTranslation } from '@/app/i18n'
import { getChartSvg } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

interface ChartProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value'] | z.infer<typeof WithChartCard>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

export async function Chart({ data, size }: ChartProps) {
  const { t } = await useTranslation('common')

  const { chart, x_axis, y_axis } = data

  const headersList = headers()
  const headersUrl = headersList.get('x-url') || ''

  const url = new URL(headersUrl)

  const areaType = url.searchParams.get('areaType')
  const areaName = url.searchParams.get('areaName')

  const hasSelectedArea = areaType && areaName

  const plots = chart.map((plot) => ({
    ...plot.value,
    // Area type uses the URL search params as a global source of truth
    // If non-existent, default to the individual values set per chart in the CMS
    geography_type: hasSelectedArea ? areaType : plot.value.geography_type,
    geography: hasSelectedArea ? areaName : plot.value.geography,
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
    )
  }

  return (
    <div className="relative h-full">
      <div className="govuk-body absolute left-1/2 top-1/2 mb-0 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 text-center">
        <p>{t('areaSelector.noData', { title: data.title, areaName })}</p>
        <Link className="govuk-link govuk-link--no-visited-state" href={url.pathname} scroll={false}>
          {t('areaSelector.resetBtn')}
        </Link>
      </div>
    </div>
  )
}
