import { useTranslation } from 'next-i18next'
import { Table } from './ChartTable.styles'
import { Column, Data } from '../CMS/Blocks/Chart/utils/parseChartTableData'

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
                context: key === 0 ? 'date' : 'plot',
                value: column.header,
                count: columns.length - 1,
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
                  {t('table.row', { context: key === 0 ? 'date' : 'plot', value: item[column.accessorKey] })}
                </Table.Cell>
              )
            })}
          </Table.Row>
        )
      })}
    </Table>
  )
}
