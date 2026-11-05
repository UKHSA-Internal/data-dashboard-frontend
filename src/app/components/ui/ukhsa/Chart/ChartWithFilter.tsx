'use client'

import kebabCase from 'lodash/kebabCase'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ChartFigure } from '@/api/models/Chart'
import { ChartComponentData } from '@/api/models/cms/Page'
import { DataClassification } from '@/api/models/DataClassification'
import { FigureConfig } from '@/api/requests/charts/getCharts'
import { TimeseriesFilterProvider, useTimeseriesFilter } from '@/app/hooks/useTimeseriesFilter'
import {
  getFilteredChartResponseData,
  getTimespanFromChartData,
  isTimeseriesChartData,
  withGeographyOverride,
} from '@/app/utils/chart.utils'

import { ChartNoScript } from '../ChartNoScript/ChartNoScript'
import ClientInformationCard from '../ClientInformationCard/ClientInformationCard'
import { LoadingSpinner } from '../Icons/LoadingSpinner'
import ChartSelect from '../View/ChartSelect/ChartSelect'
import ChartInteractive from './ChartInteractive'

interface ChartWithFilterProps {
  lastUpdated: string
  figure: ChartFigure
  figureConfig?: FigureConfig
  chartHeight: number
  title: string
  chartData: ChartComponentData
  isPublic?: boolean
  dataClassification?: DataClassification
}

const LoadingSpinnerContainer = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner />
    </div>
  )
}

const ChartWithFilterContent = ({
  figure,
  figureConfig,
  chartHeight,
  title,
  chartData,
  lastUpdated,
  isPublic = true,
  dataClassification = undefined,
}: ChartWithFilterProps) => {
  const { currentFilter } = useTimeseriesFilter()
  const [filteredChart, setFilteredChart] = useState<{
    figure: ChartFigure
    figureConfig?: FigureConfig
  }>({ figure, figureConfig })
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const previousFilterRef = useRef<string>(currentFilter)
  const hasInitialized = useRef<boolean>(false)

  // grab area selector options
  const searchParams = useSearchParams()
  const areaType = searchParams.get('areaType')
  const areaName = searchParams.get('areaName')

  const fetchFilteredChart = useCallback(
    async (filter: string) => {
      setHasError(false)
      setIsLoading(true)

      try {
        const chartResponse = await getFilteredChartResponseData(
          withGeographyOverride(chartData, areaType, areaName),
          filter,
          lastUpdated,
          isPublic,
          dataClassification
        )

        if (!chartResponse?.success || !chartResponse?.data) {
          setHasError(true)
          return
        }

        setFilteredChart((currentChart) => ({
          figure: { frames: [], ...chartResponse.data.figure },
          figureConfig: chartResponse.data.figure_config ?? currentChart.figureConfig,
        }))
        setHasError(false)
      } catch (error) {
        console.error('Error fetching filtered chart:', error)
        setHasError(true)
      } finally {
        setIsLoading(false)
        previousFilterRef.current = filter
      }
    },
    [chartData, dataClassification, isPublic, lastUpdated, areaType, areaName]
  )

  // tracks the previous fetchFilteredChart identity so we can detect when any of its
  // dependencies (e.g. area selector params) changed, without listing them individually
  const previousFetchRef = useRef<typeof fetchFilteredChart>(fetchFilteredChart)

  useEffect(() => {
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

    // if nothing has changed, escape
    if (currentFilter === previousFilterRef.current && fetchFilteredChart === previousFetchRef.current) {
      return
    }

    // otherwise, update the chart
    fetchFilteredChart(currentFilter)
  }, [currentFilter, fetchFilteredChart])

  return (
    <>
      {isTimeseriesChartData(chartData) && (
        <div className="hidden js:block">
          <ChartSelect timespan={getTimespanFromChartData(chartData, lastUpdated)} />
        </div>
      )}
      {hasError ? (
        <ClientInformationCard
          variant="error"
          title="No data available"
          message="Please adjust or reset the filter to try again."
        />
      ) : isLoading ? (
        <LoadingSpinnerContainer />
      ) : (
        <ChartInteractive
          staticChart={<LoadingSpinnerContainer />}
          figure={{ frames: [], ...filteredChart.figure }}
          figureConfig={filteredChart.figureConfig}
          chartHeight={chartHeight}
        />
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
