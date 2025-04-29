'use client'

import { z } from 'zod'

import { ChartCardSchemas } from '@/api/models/cms/Page'
import { useReadChartFilters } from '@/app/hooks/useChartFilter'
import { toSlug } from '@/app/utils/app.utils'
import { getChartTimespan } from '@/app/utils/chart.utils'

import ChartSelect from '../../ui/ukhsa/View/ChartSelect/ChartSelect'
import { Chart } from './Chart'

interface ChartWrapperProps {
  /**
   * Chart configuration data
   */
  data: z.infer<typeof ChartCardSchemas>['value']

  /**
   * Chart sizes for responsive display
   */
  sizes: Parameters<typeof Chart>[0]['sizes']

  /**
   * Enable interactive chart
   */
  enableInteractive?: boolean
}

export function ChartWrapper({ data, sizes, enableInteractive }: ChartWrapperProps) {
  const chartFilters = useReadChartFilters()
  const chartId = toSlug(data.chart[0].value.metric)
  const timeseriesFilter = chartFilters[chartId] ? `${chartId}|${chartFilters[chartId]}` : undefined

  return (
    <>
      {data.show_timeseries_filter && <ChartSelect timespan={getChartTimespan(data.chart)} chartId={chartId} />}
      <Chart data={data} sizes={sizes} enableInteractive={enableInteractive} timeseriesFilter={timeseriesFilter} />
    </>
  )
}
