import clsx from 'clsx'
import { kebabCase } from 'lodash'
import React, { Fragment } from 'react'
import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getTables } from '@/api/requests/tables/getTables'
import { RichText } from '@/app/components/cms'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { getServerTranslation } from '@/app/i18n'
import { parseChartTableData } from '@/app/utils/chart-table.utils'
import { chartSizes, chartTableMaxColumns } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'

// import { ChartEmpty } from '../../ui/ukhsa/ChartEmpty/ChartEmpty'
// import { RichText } from '../RichText/RichText'

interface TableProps {
  /* Request metadata from the CMS required to fetch from the tables api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value'] | z.infer<typeof WithChartCard>['value']

  /* Size of table based on whether the table is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

// To receieve axis title, chart.label, & fallback text
const getColumnHeader = (chartLabel: string, axisTitle: string, fallback: string) => {
  if (chartLabel) return chartLabel

  if (axisTitle) return axisTitle

  return fallback
}

/**
 * Formats a table cell value with confidence intervals if available
 * Format: {value} ({lower_confidence} to {upper_confidence})
 * The value is rendered in bold
 * On small screens, the confidence interval breaks into a new line
 */
const formatCellValue = (
  value: string | number | null,
  confidenceIntervals: { lower: number | null; upper: number | null } | undefined,
  t: (key: string, options?: { context?: string; value?: string | number | null }) => string,
  context: string
): React.ReactNode => {
  const formattedValue = t('cms.blocks.table.row', {
    context: value === null ? 'plot_null' : context,
    value,
  })

  // Only add confidence intervals if both lower and upper are available and not null
  // Don't show confidence intervals when the value itself is null
  if (
    value !== null &&
    confidenceIntervals &&
    confidenceIntervals.lower !== null &&
    confidenceIntervals.lower !== undefined &&
    confidenceIntervals.upper !== null &&
    confidenceIntervals.upper !== undefined
  ) {
    const lowerFormatted = t('cms.blocks.table.row', {
      context: 'plot',
      value: confidenceIntervals.lower,
    })
    const upperFormatted = t('cms.blocks.table.row', {
      context: 'plot',
      value: confidenceIntervals.upper,
    })
    return (
      <>
        <strong>{formattedValue}</strong>
        <span className="block sm:inline">
          {' '}
          ({lowerFormatted} to {upperFormatted})
        </span>
      </>
    )
  }

  return <strong>{formattedValue}</strong>
}

export async function Table({
  data: {
    chart,
    y_axis,
    x_axis,
    x_axis_title,
    y_axis_title,
    y_axis_minimum_value,
    y_axis_maximum_value,
    title,
    body,
    confidence_intervals,
    confidence_intervals_description,
  },
  size,
}: TableProps) {
  const { t } = await getServerTranslation('common')

  const pathname = await getPathname()
  const [areaType, areaName] = await getAreaSelector()

  const plots = chart.map((plot) => ({
    ...plot.value,
    geography_type: areaType ?? plot.value.geography_type,
    geography: areaName ?? plot.value.geography,
  }))

  // Call the table endpoint to get the data in table format
  const tableResponse = await getTables({
    plots,
    x_axis,
    y_axis,
  })

  // Call the charts endpoint as this gives us the data timestamp
  const chartRequestBody = {
    plots,
    x_axis,
    y_axis,
    x_axis_title,
    y_axis_title,
    y_axis_minimum_value,
    y_axis_maximum_value,
    chart_width: chartSizes[size].width,
    chart_height: chartSizes[size].height,
  }

  const chartResponse = await getCharts(chartRequestBody)

  if (tableResponse.success) {
    const groups = parseChartTableData(tableResponse.data, {
      maxColumns: chartTableMaxColumns[size],
    })

    const timestamp = chartResponse.success && chartResponse.data.last_updated

    let incrementingColumnId = 0

    const hasReportingDelayPeriod = groups.some(({ data }) => data.some((item) => item.inReportingDelay))

    return (
      <table className="govuk-table govuk-!-margin-bottom-0 table-fixed border-separate border-spacing-0">
        <caption className="govuk-table__caption govuk-table__caption--s govuk-!-margin-bottom-2 font-normal">
          <RichText className="govuk-!-margin-bottom-2">{t('cms.blocks.table.caption', { title, body })}</RichText>
          <p className="govuk-!-margin-0">{t('cms.blocks.table.timestamp', { timestamp })}</p>
          {confidence_intervals === true && confidence_intervals_description && (
            <p className="govuk-!-margin-0 govuk-!-margin-top-2 font-bold">{confidence_intervals_description}</p>
          )}
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
                    const chartLabel = columnIndex === 0 ? '' : (chart[labelIndex]?.value?.label ?? '')
                    const axisTitle = columnIndex === 0 ? (x_axis_title ?? '') : (y_axis_title ?? '')
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
                                {confidence_intervals === true
                                  ? formatCellValue(
                                      item.record[column.accessorKey],
                                      item.confidenceIntervals?.[column.accessorKey],
                                      t,
                                      'plot'
                                    )
                                  : t('cms.blocks.table.row', {
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

  return <ChartEmpty resetHref={pathname} />
}
