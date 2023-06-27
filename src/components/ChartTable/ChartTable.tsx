import { useTranslation } from 'next-i18next'

import { Column, Data } from '../CMS/Blocks/Chart/utils/parseChartTableData'
import { Table } from './ChartTable.styles'

interface ChartTableProps {
  caption: string
  columns: Array<Column>
  data: Array<Data>
}

export const ChartTable = ({ caption, data, columns }: ChartTableProps) => {
  const { t } = useTranslation('topic')

  return (
    <Table caption={caption}>
      <Table.Row>
        {columns.map((column, key) => {
          return (
            <Table.CellHeader key={key}>
              {t('table.header', {
                context: key === 0 ? 'date' : column.header.includes('Plot') ? 'plot_single' : 'plot_multi',
                value: column.header,
                defaultValue: '',
              })}
            </Table.CellHeader>
          )
        })}
      </Table.Row>

      {data.map((item, key) => {
        return (
          <Table.Row key={key}>
            {columns.map((column, key) => {
              return (
                <Table.Cell key={key}>
                  {t('table.row', {
                    context: key === 0 ? 'date' : 'plot',
                    value: item[column.accessorKey],
                    defaultValue: '',
                  })}
                </Table.Cell>
              )
            })}
          </Table.Row>
        )
      })}
    </Table>
  )
}
