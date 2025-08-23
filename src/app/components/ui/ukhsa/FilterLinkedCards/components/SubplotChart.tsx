'use client'

import { useEffect, useState } from 'react'

import { getSubplots, RequestParams } from '@/api/requests/charts/subplot/getSubplots'
import ChartInteractive from '@/app/components/cms/ChartInteractive/ChartInteractive'

import { getGeographyColourSelection } from '@/app/utils/geography.utils'

interface SubplotClientChartProps {
  dataFilters: any
  selectedGeographyFilters: any;
  geographyFilters: any;
}


const SubplotClientChart = ( { dataFilters, selectedGeographyFilters, geographyFilters }: SubplotClientChartProps ) => {
  const [chartResponse, setChartResponse] = useState<Awaited<ReturnType<typeof getSubplots>> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const chartRequestBody: RequestParams = {
    file_format: 'svg',
    chart_height: 260,
    chart_width: 515,
    x_axis_title: 'Coverage %',
    y_axis_title: 'Year',
    y_axis_minimum_value: null,
    y_axis_maximum_value: null,
    target_threshold: 95,
    target_threshold_label: 'coverage %',
    chart_parameters: {
      x_axis: 'geography',
      y_axis: 'metric',
      theme: 'immunisation',
      sub_theme: 'childhood_vaccines',
      date_from: '2021-01-31',
      date_to: '2021-12-31',
      age: 'all',
      sex: 'all',
      stratum: '24m'
    },
    subplots: dataFilters.map((filter: any) => {
      return {
        subplot_title: filter.value.label,
        subplot_parameters: {
          topic: filter.value.parameters.topic.value,
          metric: filter.value.parameters.metric.value,
          stratum: filter.value.parameters.stratum.value
        },
        plots: selectedGeographyFilters.map((geography: any) => {
          return {
            label: geography.name,
            geography_type: geography.geography_type,
            geography: geography.name,
            line_colour: getGeographyColourSelection(geography.geography_type, geographyFilters)
          }
        })
      }
    })
  }

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true)

        const chartResponse = await getSubplots({
          ...chartRequestBody
        })

        setChartResponse(chartResponse.data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCharts()
  }, [dataFilters, geographyFilters])

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


export default SubplotClientChart