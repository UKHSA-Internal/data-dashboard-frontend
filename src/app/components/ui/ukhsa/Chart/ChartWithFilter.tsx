'use client'

import kebabCase from 'lodash/kebabCase'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'

import { ChartFigure } from '@/api/models/Chart'
import { Chart, ChartCardSchemas } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { TimeseriesFilterProvider, useTimeseriesFilter } from '@/app/hooks/useTimeseriesFilter'
import { getChartTimespan, getFilteredData } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

import ChartNoScript from '../ChartNoScript/ChartNoScript'
import { LoadingSpinner } from '../Icons/LoadingSpinner'
import ChartSelect from '../View/ChartSelect/ChartSelect'
import ChartInteractive from './ChartInteractive'

interface ChartWithFilterProps {
  figure: ChartFigure
  title: string
  chart: Chart
  chartData: z.infer<typeof ChartCardSchemas>['value']
}

const LoadingSpinnerContainer = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner />
    </div>
  )
}

const ChartWithFilterContent = ({ figure, title, chart, chartData }: ChartWithFilterProps) => {
  const { currentFilter } = useTimeseriesFilter()
  const [filteredFigure, setFilteredFigure] = useState<ChartFigure>(figure)
  const [isLoading, setIsLoading] = useState(false)
  const previousFilterRef = useRef<string>(currentFilter)
  const isInitialMount = useRef<boolean>(true)

  useEffect(() => {
    // Skip on initial mount to avoid unnecessary fetch
    if (isInitialMount.current) {
      isInitialMount.current = false
      previousFilterRef.current = currentFilter
      return
    }

    // Skip if filter hasn't actually changed
    if (currentFilter === previousFilterRef.current) {
      return
    }

    const fetchFilteredChart = async () => {
      setIsLoading(true)

      try {
        console.log('Fetching chart with filter:', currentFilter)
        const filteredChart = getFilteredData(chartData, currentFilter)

        if (!filteredChart) {
          setIsLoading(false)
          return
        }

        let yAxisMinimum = null
        let yAxisMaximum = null
        let xAxisTitle = ''
        let yAxisTitle = ''

        if ('y_axis_minimum_value' in chartData) {
          yAxisMinimum = chartData.y_axis_minimum_value
        }
        if ('y_axis_maximum_value' in chartData) {
          yAxisMaximum = chartData.y_axis_maximum_value
        }
        if ('x_axis_title' in chartData) {
          xAxisTitle = chartData.x_axis_title || ''
        }
        if ('y_axis_title' in chartData) {
          yAxisTitle = chartData.y_axis_title || ''
        }

        const { x_axis, y_axis } = chartData

        const plots = filteredChart.map((plot) => ({
          ...plot?.value,
        }))

        const chartResponse = await getCharts({
          plots,
          x_axis,
          y_axis,
          x_axis_title: xAxisTitle,
          y_axis_title: yAxisTitle,
          y_axis_maximum_value: yAxisMaximum,
          y_axis_minimum_value: yAxisMinimum,
          chart_width: chartSizes['narrow'].width,
          chart_height: chartSizes['narrow'].height,
        })

        if (chartResponse.success && chartResponse.data) {
          setFilteredFigure({ frames: [], ...chartResponse.data.figure })
        }
      } catch (error) {
        console.error('Error fetching filtered chart:', error)
      } finally {
        setIsLoading(false)
        previousFilterRef.current = currentFilter
      }
    }

    fetchFilteredChart()
  }, [currentFilter, chartData])

  return (
    <>
      <div className="hidden js:block">
        <ChartSelect timespan={getChartTimespan(chart)} />
      </div>
      {isLoading ? (
        <LoadingSpinnerContainer />
      ) : (
        <ChartInteractive staticChart={<LoadingSpinnerContainer />} figure={filteredFigure} />
      )}
      <ChartNoScript title={kebabCase(title)} />
    </>
  )
}

const ChartWithFilter = (props: ChartWithFilterProps) => {
  return (
    <TimeseriesFilterProvider>
      <ChartWithFilterContent {...props} />
    </TimeseriesFilterProvider>
  )
}

export default ChartWithFilter