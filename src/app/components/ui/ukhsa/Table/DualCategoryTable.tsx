import clsx from 'clsx'
import { kebabCase } from 'lodash'
import React, { Fragment } from 'react'

import { DualCategoryChartCardValue } from '@/api/models/cms/Page'
import { DataClassification } from '@/api/models/DataClassification'
import { getTables } from '@/api/requests/tables/getTables'
import { RichText } from '@/app/components/cms'
import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { getPathname } from '@/app/hooks/getPathname'
import { getServerTranslation } from '@/app/i18n'
import { parseDualCategoryTableData } from '@/app/utils/chart.utils'
import { getColumnHeader } from '@/app/utils/table.utils'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'

interface DualCategoryTableProps {
  /* Request metadata from the CMS required to fetch the dual category tabular data */
  readonly data: DualCategoryChartCardValue

  readonly isPublic?: boolean

  readonly level?: DataClassification
  readonly authEnabled?: boolean
}

export async function DualCategoryTable({ data, isPublic = false, level, authEnabled }: DualCategoryTableProps) {
  const { t } = await getServerTranslation('common')

  const pathname = await getPathname()
  const [areaType, areaName] = await getAreaSelector()

  const tableResponse = await getTables({
    chart_type: data.chart_type,
    static_fields: {
      ...data.static_fields,
      geography_type: areaType ?? data.static_fields.geography_type,
      geography: areaName ?? data.static_fields.geography,
    },
    primary_field_values: data.primary_field_values,
    secondary_category: data.secondary_category,
    segments: data.segments.map(({ value }) => value),
    x_axis: data.x_axis,
    y_axis: data.y_axis,
  })

  if (!tableResponse.success) {
    return <ChartEmpty resetHref={pathname} />
  }

  const groups = parseDualCategoryTableData(tableResponse.data)

  if (!groups.length) {
    return <ChartEmpty resetHref={pathname} />
  }

  return (
    <table className="govuk-table govuk-!-margin-bottom-0 table-fixed border-separate border-spacing-0">
      <caption className="govuk-table__caption govuk-table__caption--s govuk-!-margin-bottom-2 font-normal">
        <RichText className="govuk-!-margin-bottom-2">
          {t('cms.blocks.table.caption', { title: data.title, body: data.body })}
        </RichText>
      </caption>

      <tbody className="govuk-table__body">
        {groups.map(({ columns, data: rows }, groupIndex) => {
          return (
            <Fragment key={groupIndex}>
              <tr className="govuk-table__row sticky top-0 bg-grey-3 js:-top-6">
                {columns.map((column, columnIndex) => {
                  const axisTitle = columnIndex === 0 ? (data.x_axis_title ?? '') : (data.y_axis_title ?? '')
                  const columnHeader = t('cms.blocks.table.header', {
                    context: columnIndex === 0 ? data.x_axis : 'plot_multi',
                    value: column.header,
                  })

                  return (
                    <th
                      id={`${kebabCase(data.title)}-col-${columnIndex}`}
                      key={columnIndex}
                      headers="blank"
                      className="govuk-table__header js:bg-white"
                    >
                      {getColumnHeader(column.header, axisTitle, columnHeader, isPublic, level, authEnabled)}
                    </th>
                  )
                })}
              </tr>

              {rows.map((item, key, array) => {
                return (
                  <tr key={key} className="govuk-table__row">
                    {columns.map((column, columnIndex) => {
                      const columnId = columns.length * groupIndex + (columnIndex + 1)

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
                                context: data.x_axis,
                                value: item.record[column.accessorKey],
                              })}
                            </th>
                          ) : (
                            <td
                              headers={`${kebabCase(data.title)}-col-${columnId}`}
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
