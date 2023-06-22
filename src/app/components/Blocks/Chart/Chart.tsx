import { getCharts } from '@/api/requests/charts/getCharts'
import { Chart as ChartModel } from '@/api/models/cms/Page'
import Image from 'next/image'
import { getTabular } from '@/api/requests/tabular/getTabular'
import { parseChartTableData } from '@/components/CMS/Blocks/Chart/utils/parseChartTableData'
import { chartTableMaxColumns } from '@/config/constants'

export async function Chart({ data, size }: { data: ChartModel; size: 'narrow' | 'wide' }) {
  const plots = data.map((plots) => plots.value)
  const chartRequest = getCharts(plots, 'narrow')
  const tableRequest = getTabular(plots)

  const [chart, table] = await Promise.all([chartRequest, tableRequest])

  const tables = table.success
    ? parseChartTableData(table.data, {
        maxColumns: chartTableMaxColumns[size],
      })
    : []

  return (
    <>
      {chart.success && (
        <div className="w-full h-[220px] relative mt-4 mb-2 [&+details]:mt-5 [&+details]:mb-0">
          <Image
            priority
            unoptimized
            alt=""
            fill
            sizes="100vw"
            src={`data:image/svg+xml;utf8,${encodeURIComponent(chart.data)}`}
          />
        </div>
      )}
      {table.success && (
        <details className="govuk-details" data-module="govuk-details">
          <summary className="govuk-details__summary">
            <span className="govuk-details__summary-text">View data in a tabular format</span>
          </summary>
          <div className="govuk-details__text">
            {tables.map(({ columns, data }, key) => (
              <table key={`table-${key}`} className="govuk-table table-fixed">
                <thead className="govuk-table__head">
                  <tr className="govuk-table__row">
                    {columns.map((column, key) => (
                      <th key={key} scope="col" className="govuk-table__header">
                        {column.header.includes('Plot') ? 'Amount' : column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, key) => (
                    <tr key={key} className="govuk-table__row">
                      {columns.map((column, key) => (
                        <td key={key} className="govuk-table__cell">
                          {item[column.accessorKey]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        </details>
      )}
    </>
  )
}
