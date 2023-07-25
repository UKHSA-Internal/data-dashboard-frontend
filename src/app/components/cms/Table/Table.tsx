import clsx from 'clsx'
import { Fragment } from 'react'
import { z } from 'zod'

import { WithChartCard, WithChartHeadlineAndTrendCard } from '@/api/models/cms/Page'
import { getCharts } from '@/api/requests/charts/getCharts'
import { getTabular } from '@/api/requests/tabular/getTabular'
import { useTranslation } from '@/app/i18n'
import { parseChartTableData } from '@/components/CMS/Blocks/Chart/utils/parseChartTableData'
import { chartSizes, chartTableMaxColumns } from '@/config/constants'

interface TableProps {
  /* Request metadata from the CMS required to fetch from the tables api */
  data: z.infer<typeof WithChartHeadlineAndTrendCard>['value'] | z.infer<typeof WithChartCard>['value']

  /* Size of table based on whether the table is displayed in a 1 or 2 column layout */
  size: 'narrow' | 'wide'
}

export async function Table({ data: { chart, y_axis, x_axis, title, body }, size }: TableProps) {
  const { t } = await useTranslation('topic')

  const plots = chart.map((plot) => plot.value)

  // Call the table endpoint to get the data in table format
  const tableResponse = await getTabular(plots)

  // Call the charts endpoint as this gives us the data timestamp
  const chartResponse = await getCharts({
    plots,
    x_axis,
    y_axis,
    chart_width: chartSizes[size].width,
    chart_height: chartSizes[size].height,
  })

  if (tableResponse.success) {
    const tables = parseChartTableData(tableResponse.data, {
      maxColumns: chartTableMaxColumns[size],
    })

    const timestamp = chartResponse.success && chartResponse.data.last_updated

    return (
      <div className="govuk-!-margin-top-2">
        {tables.map(({ columns, data }, key) => (
          <table key={key} className="govuk-table govuk-!-margin-bottom-4 [&:last-child]:mb-0">
            <caption
              className={clsx('govuk-table__caption govuk-table__caption--s govuk-!-margin-bottom-2 font-normal', {
                'govuk-visually-hidden': key !== 0,
              })}
            >
              {t('cms.blocks.table.caption', { title, body, timestamp, context: timestamp && 'timestamp' })}
            </caption>

            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                {columns.map((column, key) => {
                  return (
                    <th key={key} scope="col" className="govuk-table__header">
                      {t('cms.blocks.table.header', {
                        context: key === 0 ? 'date' : column.header.includes('Plot') ? 'plot_single' : 'plot_multi',
                        value: column.header,
                      })}
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody className="govuk-table__body">
              {data.map((item, key) => {
                return (
                  <tr key={key} className="govuk-table__row">
                    {columns.map((column, key) => {
                      return (
                        <Fragment key={key}>
                          {key === 0 ? (
                            <th scope="row" className="govuk-table__header font-normal">
                              {t('cms.blocks.table.row', {
                                context: 'date',
                                value: item[column.accessorKey],
                              })}
                            </th>
                          ) : (
                            <td className="govuk-table__cell">
                              {t('cms.blocks.table.row', {
                                context: 'plot',
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
            </tbody>
          </table>
        ))}
      </div>
    )
  }

  return null
}
