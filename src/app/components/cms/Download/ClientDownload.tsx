'use client'
import { useEffect, useState } from 'react'

import { DataFilter, FilterLinkedTimeSeriesData, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { getTables, Response } from '@/api/requests/tables/getTables'
import ClientInformationCard from '@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard'
import { getMinMaxFullDate } from '@/app/utils/time-period.utils'

import { DownloadForm } from './DownloadForm'

interface ClientDownloadProps {
  geography: GeographiesSchemaObject
  dataFilters: DataFilter[]
  timePeriods: TimePeriod[]
  cardData: FilterLinkedTimeSeriesData
}

export function ClientDownload({ geography, dataFilters, timePeriods }: ClientDownloadProps) {
  // TODO: Sort out the type for the table response - Success/error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableResponse, setTableResponse] = useState<{ success: boolean; data: Response } | null>(null)
  const [tableLoading, setTableLoading] = useState(true)
  const [tableError, setTableError] = useState<string | null>(null)

  const chartDateRange = getMinMaxFullDate(timePeriods)

  // hardcoded for timeseries charts but want to be parameters depending on the use case.
  const x_axis = 'date'
  const y_axis = 'metric'

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setTableLoading(true)

        const tableResponse = await getTables({
          x_axis: x_axis,
          y_axis: y_axis,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilters, geography, timePeriods])

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
    // Transform the data to match what DownloadForm expects
    const chart = dataFilters.map(
      ({
        value: {
          parameters: { topic, metric, stratum, sex, age },
        },
        value: { label, colour },
      }) => ({
        id: metric.value,
        type: 'plot' as const,
        value: {
          topic: topic.value,
          metric: metric.value,
          stratum: stratum.value,
          sex: sex.value,
          age: age.value,
          line_colour: colour,
          label: label,
          geography: geography.name,
          geography_type: geography.geography_type || undefined,
          chart_type: 'line_multi_coloured',
          line_type: 'SOLID',
          date_from: chartDateRange.date_from,
          date_to: chartDateRange.date_to,
          use_smooth_lines: false,
          use_markers: true,
        },
      })
    )

    return <DownloadForm chart={chart} xAxis={x_axis} tagManagerEventId={null} />
  }

  return (
    <ClientInformationCard
      variant="error"
      title="No data available"
      message="No data is available for the download that you have requested."
    />
  )
}
