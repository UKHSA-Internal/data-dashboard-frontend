'use client'

import { useEffect, useState } from 'react'

import { DataFilter, GeographyFilters, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { ChartResponse } from '@/api/requests/charts/getCharts'
import { getSubplots } from '@/api/requests/charts/subplot/getSubplots'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import ChartInteractive from '@/app/components/cms/ChartInteractive/ChartInteractive'
import ClientInformationCard from '@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard'
import { TimePeriodSelector } from '@/app/components/ui/ukhsa/TimePeriodSelector/TimePeriodSelector'
import { flattenGeographyObject, getGeographyColourSelection } from '@/app/utils/geography.utils'
import { FilterLinkedSubplotData } from '@/api/models/cms/Page/GlobalFilter'

interface SubplotClientChartProps {
  selectedVaccinations: DataFilter[]
  geographyFilters: GeographyFilters
  timePeriods: TimePeriod[]
  currentTimePeriodIndex: number
  handleTimePeriodChange: (index: number) => void
  geography: GeographiesSchemaObject
  cardData: FilterLinkedSubplotData
}

const SubplotClientChart = ({
  selectedVaccinations,
  geography,
  geographyFilters,
  timePeriods,
  currentTimePeriodIndex,
  handleTimePeriodChange,
  cardData,
}: SubplotClientChartProps) => {
  const [chartResponse, setChartResponse] = useState<ChartResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const geographyRelations = flattenGeographyObject(geography)
  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true)

        const chartResponse = await getSubplots({
          file_format: 'svg',
          chart_height: 260,
          chart_width: 515,
          x_axis_title: 'Coverage %',
          y_axis_title: 'Year',
          y_axis_minimum_value: null,
          y_axis_maximum_value: null,
          target_threshold: cardData.target_threshold,
          target_threshold_label: cardData.target_threshold_label,
          chart_parameters: {
            x_axis: 'geography',
            y_axis: 'metric',
            theme: 'immunisation',
            sub_theme: 'childhood_vaccines',
            date_from: timePeriods[currentTimePeriodIndex].value.date_from,
            date_to: timePeriods[currentTimePeriodIndex].value.date_to,
            age: 'all',
            sex: 'all',
            stratum: '24m',
          },
          subplots: selectedVaccinations.map((filter: DataFilter) => {
            return {
              subplot_title: filter.value.label,
              subplot_parameters: {
                topic: filter.value.parameters.topic.value,
                metric: filter.value.parameters.metric.value,
                stratum: filter.value.parameters.stratum.value,
              },
              plots: geographyRelations.map((geography) => {
                return {
                  label: geography.name,
                  geography_type: geography.geography_type,
                  geography: geography.name,
                  line_colour: getGeographyColourSelection(geography.geography_type!, geographyFilters),
                }
              }),
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
  }, [selectedVaccinations, geographyFilters, currentTimePeriodIndex])

  if (loading) {
    return (
      <ClientInformationCard
        variant="loading"
        title="Chart loading"
        message="Requesting chart based on selected filters"
      />
    )
  }

  if (error) {
    return (
      <ClientInformationCard variant="error" title="error" message="No data available for the selected chart filters" />
    )
  }

  if (chartResponse) {
    const { figure } = chartResponse
    return (
      <>
        <ChartInteractive fallbackUntilLoaded={<h2>loading</h2>} figure={{ frames: [], ...figure }} />
        <div className="pt-6">
          <TimePeriodSelector
            timePeriods={timePeriods}
            currentTimePeriodIndex={currentTimePeriodIndex}
            onTimePeriodChange={handleTimePeriodChange}
          />
        </div>
      </>
    )
  }
}

export default SubplotClientChart
