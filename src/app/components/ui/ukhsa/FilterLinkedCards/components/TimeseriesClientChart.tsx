'use client'

import { useEffect, useState } from 'react'

import { getCharts, RequestParams } from '@/api/requests/charts/getCharts'

import ChartInteractive from '../../../../cms/ChartInteractive/ChartInteractive'

interface ClientChartProps {
  geography: any
  dataFilters: any
  // data: z.infer<typeof ChartCardSchemas>['value'];
}


const TimeseriesClientChart = ({ geography, dataFilters }: ClientChartProps) => {
  const [chartResponse, setChartResponse] = useState<Awaited<ReturnType<typeof getCharts>> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const chartRequestBody: RequestParams = {
    file_format: 'svg',
    chart_height: 220,
    chart_width: 515,
    x_axis: 'date',
    y_axis: 'metric',
    y_axis_title: 'Year',
    y_axis_minimum_value: null,
    y_axis_maximum_value: null,
    plots: dataFilters.map((filter: any) => {
      return {
        topic: filter.value.parameters.topic.value,
        metric: filter.value.parameters.metric.value,
        stratum: filter.value.parameters.stratum.value,
        sex: filter.value.parameters.sex.value,
        age: filter.value.parameters.age.value,
        line_colour: filter.value.colour,
        label: filter.value.label,
        geography: geography.name,
        geography_type: 'Upper Tier Local Authority',
        chart_type: 'line_multi_coloured',
        line_type: 'SOLID',
        date_from: '2020-01-01',
        date_to: '2025-12-31',
        use_smooth_lines: false,
        use_markers: true,
      }
    }),
  }

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true)

        const chartResponse = await getCharts({
          ...chartRequestBody,
          chart_width: chartRequestBody.chart_width ?? 515,
          chart_height: chartRequestBody.chart_height ?? 260,
        })

        setChartResponse(chartResponse.data)
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
    return (
      <ChartInteractive fallbackUntilLoaded={<h2>loading</h2>} figure={{ frames: [], ...figure }} />
    )
  }
}

export default TimeseriesClientChart