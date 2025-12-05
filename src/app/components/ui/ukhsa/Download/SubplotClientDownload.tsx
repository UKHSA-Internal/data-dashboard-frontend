'use client'
import { useEffect, useState } from 'react'

import { DataFilter, GeographyFilters, ThresholdFilter, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { getSubplotTables, Response } from '@/api/requests/tables/subplot/getSubplotTables'
import ClientInformationCard from '@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard'
import { SubplotDownloadForm } from '@/app/components/ui/ukhsa/Download/SubplotDownloadForm'
import { flattenGeographyObject, getGeographyColourSelection } from '@/app/utils/geography.utils'
import { mapThresholdsToMetricValueRanges, MetricValueRange } from '@/app/utils/threshold.utils'

interface SubplotClientDownloadProps {
  geography: GeographiesSchemaObject
  geographyFilters: GeographyFilters
  dataFilters: DataFilter[]
  selectedThresholds: ThresholdFilter[]
  timePeriods: TimePeriod[]
  currentTimePeriodIndex: number
}

export function SubplotClientDownload({
  geography,
  geographyFilters,
  dataFilters,
  timePeriods,
  currentTimePeriodIndex,
  selectedThresholds,
}: SubplotClientDownloadProps) {
  const [tableResponse, setTableResponse] = useState<{ success: boolean; data: Response } | null>(null)
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tableError, setTableError] = useState<string | null>(null)

  const geographyRelations = flattenGeographyObject(geography)

  const x_axis = 'geography'
  const y_axis = 'metric'
  const theme = 'immunisations'
  const sub_theme = 'childhood_vaccines'

  useEffect(() => {
    let metricValueRanges: MetricValueRange[] | [] = []

    if (selectedThresholds) {
      metricValueRanges = mapThresholdsToMetricValueRanges(selectedThresholds)
    }

    const fetchTables = async () => {
      try {
        setTableLoading(true)

        const tableResponse = await getSubplotTables({
          chart_parameters: {
            x_axis: x_axis,
            y_axis: y_axis,
            theme: theme,
            sub_theme: sub_theme,
            date_from: timePeriods[currentTimePeriodIndex].value.date_from,
            date_to: timePeriods[currentTimePeriodIndex].value.date_to,
            metric_value_ranges: metricValueRanges,
          },
          subplots: dataFilters.map((filter: DataFilter) => {
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

        if (tableResponse.success) {
          setTableResponse(tableResponse)
        } else {
          setTableError('Failed to parse table response')
        }
      } catch (error) {
        setTableError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setTableLoading(false)
      }
    }

    fetchTables()
  }, [geography, dataFilters, selectedThresholds])

  if (tableLoading) {
    return (
      <ClientInformationCard
        variant="loading"
        title="Download loading"
        message="Requesting download information based on selected filters"
      />
    )
  }

  if (tableError) {
    return (
      <ClientInformationCard
        variant="error"
        title="Error"
        message="No data is available for the download that you have requested."
      />
    )
  }

  if (tableResponse && tableResponse.success) {
    let metricValueRanges: MetricValueRange[] | [] = []

    if (selectedThresholds) {
      metricValueRanges = mapThresholdsToMetricValueRanges(selectedThresholds)
    }
    const chart = {
      chart_parameters: {
        x_axis: x_axis,
        y_axis: y_axis,
        theme: theme,
        sub_theme: sub_theme,
        date_from: timePeriods[currentTimePeriodIndex].value.date_from,
        date_to: timePeriods[currentTimePeriodIndex].value.date_to,
        metric_value_ranges: metricValueRanges,
      },
      subplots: dataFilters.map((filter: DataFilter) => {
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
    }

    return <SubplotDownloadForm chart={chart} xAxis={x_axis} tagManagerEventId={null} />
  }
}
