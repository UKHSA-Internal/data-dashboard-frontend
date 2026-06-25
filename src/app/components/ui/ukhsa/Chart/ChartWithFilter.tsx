'use client'

import kebabCase from 'lodash/kebabCase'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ChartFigure } from '@/api/models/Chart'
import { ChartComponentData } from '@/api/models/cms/Page'
import { TimeseriesFilterProvider, useTimeseriesFilter } from '@/app/hooks/useTimeseriesFilter'
import { getFilteredChartResponseData, getTimespanFromChartData, isTimeseriesChartData } from '@/app/utils/chart.utils'

import { ChartNoScript } from '../ChartNoScript/ChartNoScript'
import ClientInformationCard from '../ClientInformationCard/ClientInformationCard'
import { LoadingSpinner } from '../Icons/LoadingSpinner'
import ChartSelect from '../View/ChartSelect/ChartSelect'
import ChartInteractive from './ChartInteractive'

interface ChartWithFilterProps {
  lastUpdated: string
  figure: ChartFigure
  title: string
  chartData: ChartComponentData
}

const LoadingSpinnerContainer = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner />
    </div>
  )
}

const ChartWithFilterContent = ({ figure, title, chartData, lastUpdated }: ChartWithFilterProps) => {
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
        const chartResponse = await getFilteredChartResponseData(chartData, filter, lastUpdated)

        if (!chartResponse?.success || !chartResponse?.data) {
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
    [chartData, lastUpdated]
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
