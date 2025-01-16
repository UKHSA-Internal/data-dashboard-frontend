import { z } from 'zod'

import { ChartSchemas } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { getServerTranslation } from '@/app/i18n'
import { getChartSvg } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'

interface ChartProps {
  /* Request metadata from the CMS required to fetch from the headlines api */
  data: z.infer<typeof ChartSchemas>['value']

  /* Size of chart based on whether the chart is displayed in a 1 or 2 column layout, or half/third layouts for landiing page  */
  size: 'narrow' | 'wide' | 'half' | 'third'
}

export async function Chart({ data, size }: ChartProps) {
  const { t } = await getServerTranslation('common')

  let yAxisMinimum = null
  let yAxisMaximum = null
  let xAxisTitle = null
  let yAxisTitle = null

  if ('y_axis_minimum_value' in data) {
    yAxisMinimum = data.y_axis_minimum_value
  }
  if ('y_axis_maximum_value' in data) {
    yAxisMaximum = data.y_axis_maximum_value
  }
  if ('x_axis_title' in data) {
    xAxisTitle = data.x_axis_title
  }
  if ('y_axis_title' in data) {
    yAxisTitle = data.y_axis_title
  }

  const { chart, x_axis, y_axis } = data

  const pathname = getPathname()
  const [areaType, areaName] = getAreaSelector()

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
      x_axis_title: xAxisTitle,
      y_axis_title: yAxisTitle,
      y_axis_maximum_value: yAxisMaximum,
      y_axis_minimum_value: yAxisMinimum,
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
        x_axis_title: xAxisTitle,
        y_axis_title: yAxisTitle,
        y_axis_maximum_value: yAxisMaximum,
        y_axis_minimum_value: yAxisMinimum,
        chart_width: chartSizes.wide.width,
        chart_height: chartSizes.wide.height,
      })
    )
  }

  // All landing page charts loading small width first
  const landingChartRequests = [
    getCharts({
      plots,
      x_axis,
      y_axis,
      x_axis_title: xAxisTitle,
      y_axis_title: yAxisTitle,
      y_axis_maximum_value: yAxisMaximum,
      y_axis_minimum_value: yAxisMinimum,
      chart_width: chartSizes.third.width,
      chart_height: chartSizes.third.height,
    }),
  ]

  // Wider landing page charts where required
  if (size === 'half') {
    landingChartRequests.push(
      getCharts({
        plots,
        x_axis,
        y_axis,
        x_axis_title: xAxisTitle,
        y_axis_title: yAxisTitle,
        y_axis_maximum_value: yAxisMaximum,
        y_axis_minimum_value: yAxisMinimum,
        chart_width: chartSizes.half.width,
        chart_height: chartSizes.half.height,
      })
    )
  }

  const [narrowChartResponse, wideChartResponse] = await Promise.all(chartRequests)
  const [thirdChartResponse, halfChartResponse] = await Promise.all(landingChartRequests)

  const onLandingPage = size === 'third' || size === 'half'

  if (narrowChartResponse.success) {
    const {
      data: { chart: narrowChart, alt_text: alt },
    } = narrowChartResponse

    const wideChart = wideChartResponse && wideChartResponse.success && wideChartResponse.data.chart
    const thirdChart = (thirdChartResponse && thirdChartResponse.success && thirdChartResponse.data.chart) || ''
    const halfChart = halfChartResponse && halfChartResponse.success && halfChartResponse.data.chart

    return (
      <picture data-testid="chart" data-location={areaName}>
        {wideChart && (
          <source
            media="(min-width: 768px)"
            srcSet={`data:image/svg+xml;utf8,${getChartSvg(wideChart)}`}
            data-testid="chart-src-min-768"
          />
        )}
        {halfChart && (
          <source
            media="(min-width: 1200px)"
            srcSet={`data:image/svg+xml;utf8,${getChartSvg(halfChart)}`}
            data-testid="chart-src-min-768"
          />
        )}
        <img
          alt={t('cms.blocks.chart.alt', { body: alt })}
          src={`data:image/svg+xml;utf8,${getChartSvg(onLandingPage ? thirdChart : narrowChart)}`}
          className="w-full"
        />
      </picture>
    )
  }

  return <ChartEmpty resetHref={pathname} />
}
