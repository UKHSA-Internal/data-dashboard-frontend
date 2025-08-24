'use client'
import clsx from 'clsx'
import { kebabCase } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { ChartResponse, getCharts } from '@/api/requests/charts/getCharts'
import { getTables, Response } from '@/api/requests/tables/getTables'
import { useTranslation } from '@/app/i18n/client'
import { parseChartTableData } from '@/app/utils/chart-table.utils'
import { chartSizes, chartTableMaxColumns } from '@/config/constants'
import { getMinMaxFullDate, MinMaxFullDate } from '@/app/utils/time-period.utils'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { DataFilter, TimePeriod } from '@/api/models/cms/Page/GlobalFilter'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'
import { RichText } from '../RichText/RichText'

interface TableProps {
  /* Size of table based on whether the table is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
  geography: GeographiesSchemaObject
  dataFilters: DataFilter[]
  timePeriods: TimePeriod[]
}

// To receieve axis title, chart.label, & fallback text
const getColumnHeader = (chartLabel: string, axisTitle: string, fallback: string) => {
  if (chartLabel) return chartLabel

  if (axisTitle) return axisTitle

  return fallback
}

export function ClientTable({
  // data: { chart, y_axis, x_axis, x_axis_title, y_axis_title, title, body },
  size,
  geography,
  dataFilters,
  timePeriods,
}: TableProps) {
  const { t } = useTranslation('common')
  const title = 'example title'
  const body = 'example body'

  const [chartResponse, setChartResponse] = useState<{ success: boolean; data: ChartResponse } | null>(null)
  const [tableResponse, setTableResponse] = useState<{ success: boolean; data: Response } | null>()
  const [tableLoading, setTableLoading] = useState(true)
  const [tableError, setTableError] = useState<string | null>(null)
  const [chartLoading, setChartLoading] = useState(true)
  const [chartError, setChartError] = useState<string | null>(null)

  const chartDateRange: MinMaxFullDate = getMinMaxFullDate(timePeriods)

  const x_axis_title = 'year'
  const y_axis_title = `Vaccine Coverage %`
  const x_axis = 'date'
  const y_axis = 'metric'

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setChartLoading(true)

        const chartResponse = await getCharts({
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
          setChartResponse(chartResponse)
        } else {
          setChartError('Failed to parse chart response')
        }
      } catch (error) {
        setChartError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setTableLoading(false)
      }
    }

    fetchCharts()
  }, [dataFilters, geography])

  useEffect(() => {
    const fetchTables = async () => {
      console.log('called fetch tables')
      try {
        setTableLoading(true)

        const tableResponse = await getTables({
          x_axis: 'date',
          y_axis: 'metric',
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
        console.log('tableResponse', tableResponse)
        if (tableResponse.success) {
          setTableResponse(tableResponse)
        } else {
          setTableError('Failed to parse chart response')
        }
      } catch (error) {
        setTableError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setTableLoading(false)
      }
    }

    fetchTables()
  }, [dataFilters, geography])

  if (tableResponse && chartResponse) {
    console.log('tableResponse: ', tableResponse)
    const groups = parseChartTableData(tableResponse.data, {
      maxColumns: chartTableMaxColumns[size],
    })

    console.log('groups: ', groups)

    const timestamp = chartResponse.success && chartResponse.data.last_updated

    let incrementingColumnId = 0

    const hasReportingDelayPeriod = groups.some(({ data }) => data.some((item) => item.inReportingDelay))

    return (
      <table className="govuk-table govuk-!-margin-bottom-0 table-fixed border-separate border-spacing-0">
        <caption className="govuk-table__caption govuk-table__caption--s govuk-!-margin-bottom-2 font-normal">
          <RichText className="govuk-!-margin-bottom-2">{t('cms.blocks.table.caption', { title, body })}</RichText>
          <p className="govuk-!-margin-0">{t('cms.blocks.table.timestamp', { timestamp })}</p>
          {hasReportingDelayPeriod && (
            <>
              <p className="govuk-body-s govuk-!-padding-top-4 govuk-!-padding-right-2 inline-block">
                {t('reportingLagPeriodKey')}
              </p>
              <span className="size-2 border-y-2 border-delay-blue bg-delay-blue-opaque p-0 px-2"></span>
            </>
          )}
        </caption>

        <tbody className="govuk-table__body">
          {groups.map(({ columns, data }, groupIndex) => {
            let labelIndex = 0

            return (
              <Fragment key={groupIndex}>
                <tr className="govuk-table__row sticky top-0 bg-grey-3 js:-top-6">
                  {columns.map((column, columnIndex) => {
                    // For multu-column tables, working out which label to get
                    labelIndex = groupIndex * (columns.length - 1) + columnIndex - 1

                    // In cases where there are 2 columns all table,
                    // but the last row only has one, an exception is needed here
                    if (groups.length > 1 && groupIndex == groups.length - 1) {
                      const previousColLength = groups[groupIndex - 1]?.columns?.length - 1
                      labelIndex = groupIndex * previousColLength + columnIndex - 1
                    }

                    incrementingColumnId += 1
                    // const chartLabel = columnIndex === 0 ? '' : chart[labelIndex]?.value?.label ?? ''
                    const chartLabel = column.header
                    const axisTitle = columnIndex === 0 ? x_axis_title ?? '' : y_axis_title ?? ''
                    const columnHeader = t('cms.blocks.table.header', {
                      context:
                        columnIndex === 0 ? x_axis : column.header.includes('Plot') ? 'plot_single' : 'plot_multi',
                      value: column.header,
                    })

                    return (
                      <th
                        id={`${kebabCase(title)}-col-${incrementingColumnId}`}
                        key={columnIndex}
                        headers="blank"
                        className="govuk-table__header js:bg-white"
                      >
                        {getColumnHeader(chartLabel, axisTitle, columnHeader)}
                      </th>
                    )
                  })}
                </tr>

                {data.map((item, key, array) => {
                  return (
                    <tr
                      key={key}
                      className="govuk-table__row"
                      aria-label={item.inReportingDelay ? t('reportingLagPeriodKey') : undefined}
                    >
                      {columns.map((column, columnIndex) => {
                        const incrementingColumnId = columns.length * groupIndex + (columnIndex + 1)
                        const previousItemHasDelay = data[key - 1]?.inReportingDelay ?? false
                        const nextItemHasDelay = data[key + 1]?.inReportingDelay ?? false

                        return (
                          <Fragment key={columnIndex}>
                            {columnIndex === 0 ? (
                              <th
                                className={clsx('govuk-table__header font-normal', {
                                  'bg-delay-blue-opaque': item.inReportingDelay,
                                  'border-t-2 border-t-delay-blue': item.inReportingDelay && !previousItemHasDelay,
                                  'border-b-2 border-b-delay-blue': item.inReportingDelay && !nextItemHasDelay,
                                  'border-b-0': !item.inReportingDelay && nextItemHasDelay,
                                  'border-t-0': !item.inReportingDelay && previousItemHasDelay,
                                  'border-b-2 border-black': key + 1 === array.length,
                                  'border-b-[0.5px]': !(key + 1 === array.length),
                                })}
                              >
                                {t('cms.blocks.table.row', {
                                  context: x_axis,
                                  value: item.record[column.accessorKey],
                                })}
                              </th>
                            ) : (
                              <td
                                headers={`${kebabCase(title)}-col-${incrementingColumnId}`}
                                className={clsx('govuk-table__cell', {
                                  'bg-delay-blue-opaque': item.inReportingDelay,
                                  'border-t-2 border-t-delay-blue': item.inReportingDelay && !previousItemHasDelay,
                                  'border-b-2 border-b-delay-blue': item.inReportingDelay && !nextItemHasDelay,
                                  'border-b-0': !item.inReportingDelay && nextItemHasDelay,
                                  'border-t-0': !item.inReportingDelay && previousItemHasDelay,
                                  'border-b-2 border-black': key + 1 === array.length,
                                  'border-b-[0.5px]': !(key + 1 === array.length),
                                })}
                              >
                                {t('cms.blocks.table.row', {
                                  context: item.record[column.accessorKey] === null ? 'plot_null' : 'plot',
                                  value: item.record[column.accessorKey],
                                })}
                              </td>
                            )}
                          </Fragment>
                        )
                      })}
                    </tr>
                  )
                })}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    )
  }

  // TODO: This needs to be a chart loading / chart error component displayed
  // return <ChartEmpty resetHref={pathname} />
}
