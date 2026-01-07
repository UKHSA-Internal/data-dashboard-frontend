'use client'

import kebabCase from 'lodash/kebabCase'
import { useCallback, useEffect, useRef, useState } from 'react'
import { z } from 'zod'

import { ChartFigure } from '@/api/models/Chart'
import { Chart, ChartCardSchemas } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { TimeseriesFilterProvider, useTimeseriesFilter } from '@/app/hooks/useTimeseriesFilter'
import { getChartTimespan, getFilteredData } from '@/app/utils/chart.utils'
import { chartSizes } from '@/config/constants'

import { ChartNoScript } from '../ChartNoScript/ChartNoScript'
import ClientInformationCard from '../ClientInformationCard/ClientInformationCard'
import { LoadingSpinner } from '../Icons/LoadingSpinner'
import ChartSelect from '../View/ChartSelect/ChartSelect'
import ChartInteractive from './ChartInteractive'

interface ChartWithFilterProps {
  lastUpdated: string
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

const ChartWithFilterContent = ({ figure, title, chart, chartData, lastUpdated }: ChartWithFilterProps) => {
  const { currentFilter } = useTimeseriesFilter()
  const [filteredFigure, setFilteredFigure] = useState<ChartFigure>(figure)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const previousFilterRef = useRef<string>(currentFilter)
  const isFirstRender = useRef<boolean>(true)
  const hasInitialized = useRef<boolean>(false)

  const fetchFilteredChart = useCallback(
    async (filter: string) => {
      setHasError(false)
      setIsLoading(true)

      try {
        const filteredChart = getFilteredData(chartData, filter, lastUpdated)

        if (!filteredChart) {
          setHasError(true)
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

        if (!chartResponse.success || !chartResponse.data) {
          setHasError(true)
          return
        }

        setFilteredFigure({ frames: [], ...chartResponse.data.figure })
        setHasError(false)
      } catch (error) {
        console.error('Error fetching filtered chart:', error)
        setHasError(true)
      } finally {
        setIsLoading(false)
        previousFilterRef.current = filter
      }
    },
    [chartData]
  )

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip refetch on the first render, we already have initial data
      isFirstRender.current = false
      previousFilterRef.current = currentFilter
      return
    }

    // Skip if filter hasn't changed
    if (currentFilter === previousFilterRef.current) {
      return
    }

    // On initial mount: if filter is not 'all', fetch the filtered chart
    if (!hasInitialized.current) {
      hasInitialized.current = true
      if (currentFilter !== 'all') {
        fetchFilteredChart(currentFilter)
      } else {
        previousFilterRef.current = currentFilter
      }
      return
    }

    fetchFilteredChart(currentFilter)
  }, [currentFilter, fetchFilteredChart])

  return (
    <>
      <div className="hidden js:block">
        <ChartSelect timespan={getChartTimespan(chart, lastUpdated)} />
      </div>
      {hasError ? (
        <ClientInformationCard
          variant="error"
          title="No data available"
          message="Please adjust or reset the filter to try again."
        />
      ) : isLoading ? (
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
