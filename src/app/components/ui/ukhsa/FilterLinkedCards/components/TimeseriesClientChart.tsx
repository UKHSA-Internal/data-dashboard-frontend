'use client'

import { useEffect, useState } from 'react'

import { DataFilter, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { ChartResponse, getCharts } from '@/api/requests/charts/getCharts'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { getMinMaxFullDate, MinMaxFullDate } from '@/app/utils/time-period.utils'

import ChartInteractive from '../../../../cms/ChartInteractive/ChartInteractive'

interface ClientChartProps {
  geography: GeographiesSchemaObject
  dataFilters: DataFilter[]
  timePeriods: TimePeriod[]
}

const TimeseriesClientChart = ({ geography, dataFilters, timePeriods }: ClientChartProps) => {
  const [chartResponse, setChartResponse] = useState<ChartResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const chartDateRange: MinMaxFullDate = getMinMaxFullDate(timePeriods)

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true)

        const chartResponse = await getCharts({
          file_format: 'svg',
          chart_height: 260,
          chart_width: 515,
          x_axis: 'date',
          y_axis: 'metric',
          y_axis_title: 'Year',
          y_axis_minimum_value: null,
          y_axis_maximum_value: null,
          plots: dataFilters.map((filter: DataFilter) => {
            return {
              topic: filter.value.parameters.topic.value,
              metric: filter.value.parameters.metric.value,
              stratum: filter.value.parameters.stratum.value,
              sex: filter.value.parameters.sex.value,
              age: filter.value.parameters.age.value,
              line_colour: filter.value.colour,
              label: filter.value.label,
              geography: geography.name,
              geography_type: geography.geography_type || undefined,
              chart_type: 'line_multi_coloured',
              line_type: 'SOLID',
              date_from: chartDateRange.date_from,
              date_to: chartDateRange.date_to,
              use_smooth_lines: false,
              use_markers: true,
            }
          }),
        })
        if (chartResponse.success) {
          setChartResponse(chartResponse.data)
        } else {
          setError('Failed to parse chart response')
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCharts()
  }, [dataFilters, geography])

  if (loading) {
    return <span>loading...</span>
  }

  if (error) {
    return <span>{`Error: ${error}`}</span>
  }

  if (chartResponse) {
    const { figure } = chartResponse
    return <ChartInteractive fallbackUntilLoaded={<h2>loading</h2>} figure={{ frames: [], ...figure }} />
  }
}

export default TimeseriesClientChart
