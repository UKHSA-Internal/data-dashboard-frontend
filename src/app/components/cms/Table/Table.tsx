import { kebabCase } from 'lodash'
import { Fragment } from 'react'
import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getTables } from '@/api/requests/tables/getTables'
import { useAreaSelector } from '@/app/hooks/useAreaSelector'
import { usePathname } from '@/app/hooks/usePathname'
import { useTranslation } from '@/app/i18n'
import { parseChartTableData } from '@/app/utils/chart-table.utils'
import { chartSizes, chartTableMaxColumns } from '@/config/constants'

import { ChartEmpty } from '../ChartEmpty/ChartEmpty'
import { RichText } from '../RichText/RichText'

interface TableProps {
  /* Request metadata from the CMS required to fetch from the tables api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value'] | z.infer<typeof WithChartCard>['value']

  /* Size of table based on whether the table is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

export async function Table({ data: { chart, y_axis, x_axis, title, body }, size }: TableProps) {
  const { t } = await useTranslation('common')

  const pathname = usePathname()
  const [areaType, areaName] = useAreaSelector()

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
  const chartResponse = await getCharts({
    plots,
    x_axis,
    y_axis,
    chart_width: chartSizes[size].width,
    chart_height: chartSizes[size].height,
  })

  if (tableResponse.success) {
    const groups = parseChartTableData(tableResponse.data, {
      maxColumns: chartTableMaxColumns[size],
    })

    const timestamp = chartResponse.success && chartResponse.data.last_updated

    let incrementingColumnId = 0

    return (
      <table className="govuk-table govuk-!-margin-bottom-0 table-fixed border-separate border-spacing-0">
        <caption className="govuk-table__caption govuk-table__caption--s govuk-!-margin-bottom-2 font-normal">
          <RichText className="govuk-!-margin-bottom-2">{t('cms.blocks.table.caption', { title, body })}</RichText>
          <p className="govuk-!-margin-0">{t('cms.blocks.table.timestamp', { timestamp })}</p>
        </caption>

        <tbody className="govuk-table__body">
          {groups.map(({ columns, data }, groupIndex) => {
            return (
              <Fragment key={groupIndex}>
                <tr className="govuk-table__row sticky top-0 bg-grey-3 js:-top-6">
                  {columns.map((column, columnIndex) => {
                    incrementingColumnId += 1
                    return (
                      <th
                        id={`${kebabCase(title)}-col-${incrementingColumnId}`}
                        key={columnIndex}
                        headers="blank"
                        className="govuk-table__header js:bg-white"
                      >
                        {t('cms.blocks.table.header', {
                          context:
                            columnIndex === 0 ? x_axis : column.header.includes('Plot') ? 'plot_single' : 'plot_multi',
                          value: column.header,
                        })}
                      </th>
                    )
                  })}
                </tr>

                {data.map((item, key) => {
                  return (
                    <tr key={key} className="govuk-table__row">
                      {columns.map((column, columnIndex) => {
                        const incrementingColumnId = columns.length * groupIndex + (columnIndex + 1)

                        return (
                          <Fragment key={columnIndex}>
                            {columnIndex === 0 ? (
                              <th className="govuk-table__header font-normal">
                                {t('cms.blocks.table.row', {
                                  context: x_axis,
                                  value: item[column.accessorKey],
                                })}
                              </th>
                            ) : (
                              <td
                                headers={`${kebabCase(title)}-col-${incrementingColumnId}`}
                                className="govuk-table__cell"
                              >
                                {t('cms.blocks.table.row', {
                                  context: item[column.accessorKey] === null ? 'plot_null' : 'plot',
                                  value: item[column.accessorKey],
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
