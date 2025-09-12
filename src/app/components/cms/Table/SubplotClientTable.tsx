'use client'
import clsx from 'clsx'
import { kebabCase } from 'lodash'
import { Fragment, useEffect, useState } from 'react'

import {
  DataFilter,
  FilterLinkedSubplotData,
  GeographyFilters,
  ThresholdFilter,
  TimePeriod,
} from '@/api/models/cms/Page/GlobalFilter'
import { GeographiesSchemaObject } from '@/api/requests/geographies/getGeographies'
import { getSubplotTables, Response } from '@/api/requests/tables/subplot/getSubplotTables'
import ClientInformationCard from '@/app/components/ui/ukhsa/ClientInformationCard/ClientInformationCard'
import { useTranslation } from '@/app/i18n/client'
import { parseChartTableData } from '@/app/utils/chart-table.utils'
import {
  FlattenedGeography,
  flattenGeographyObject,
  getGeographyColourSelection,
  getParentGeography,
} from '@/app/utils/geography.utils'
import { mapThresholdsToMetricValueRanges, MetricValueRange } from '@/app/utils/threshold.utils'
import { chartTableMaxColumns } from '@/config/constants'

interface TableProps {
  size: 'narrow' | 'wide'
  timestamp: string | null
  geography: GeographiesSchemaObject
  geographyFilters: GeographyFilters
  dataFilters: DataFilter[]
  selectedThresholds: ThresholdFilter[]
  timePeriods: TimePeriod[]
  currentTimePeriodIndex: number
  cardData: FilterLinkedSubplotData
}

const getColumnHeader = (chartLabel: string, axisTitle: string, fallback: string) => {
  if (chartLabel) return chartLabel

  if (axisTitle) return axisTitle

  return fallback
}

export function SubplotClientTable({
  size,
  timestamp,
  geography,
  geographyFilters,
  dataFilters,
  selectedThresholds,
  timePeriods,
  currentTimePeriodIndex,
  cardData,
}: TableProps) {
  const { t } = useTranslation('common')

  const [tableResponse, setTableResponse] = useState<{ success: boolean; data: Response } | null>(null)
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [tableError, setTableError] = useState<string | null>(null)

  const geographyParent: FlattenedGeography | null = getParentGeography(geography)
  const geographyRelations = flattenGeographyObject(geography)

  const title = `${cardData.title_prefix}`
  const geographyDetails = `(${geographyParent!.name}, ${geography.name})`
  const x_axis_title = 'year'
  const y_axis_title = 'Vaccine coverage %'
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
          setTableLoading(false)
        }
      } catch (error) {
        setTableError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setTableLoading(false)
      }
    }

    fetchTables()
  }, [geography, dataFilters, dataFilters, selectedThresholds])

  if (tableLoading) {
    return <ClientInformationCard variant="loading" />
  }

  if (tableError) {
    return <h2>Error {tableError}</h2>
  }

  if (tableResponse) {
    const groups = parseChartTableData(tableResponse.data, {
      maxColumns: chartTableMaxColumns[size],
    })

    let incrementingColumnId = 0

    return (
      <table className="govuk-table govuk-!-margin-bottom-0 table-fixed border-separate border-spacing-0">
        <caption className="govuk-table__caption govuk-table__caption--s govuk-!-margin-bottom-2">
          <div className="govuk-!-margin-bottom-2 font-bold">
            {t('cms.blocks.table.timeseries_title', { title, geographyDetails })}
          </div>
          <p className="govuk-!-margin-0">{timestamp && t('cms.blocks.table.timestamp', { timestamp })}</p>
        </caption>

        <tbody className="govuk-table__body">
          {groups.map(({ columns, data }, groupIndex) => {
            return (
              <Fragment key={groupIndex}>
                <tr className="govuk-table__row sticky top-0 bg-grey-3 js:-top-6">
                  {columns.map((column, columnIndex) => {
                    incrementingColumnId += 1
                    const chartLabel = column.header === 'Date' ? 'Location' : column.header
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
                    <tr key={key} className="govuk-table__row">
                      {columns.map((column, columnIndex) => {
                        const incrementingColumnId = columns.length * groupIndex + (columnIndex + 1)

                        return (
                          <Fragment key={columnIndex}>
                            {columnIndex === 0 ? (
                              <th
                                className={clsx('govuk-table__header font-normal', {
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
}
