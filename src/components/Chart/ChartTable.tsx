import { useTranslation } from 'next-i18next'
import { Table } from './ChartTable.styles'

interface TopicTableProps {
  caption: string
  rows: Array<{ date: string; value: number }>
}

const TopicTable = ({ caption, rows }: TopicTableProps) => {
  const { t } = useTranslation('topic')

  return (
    <Table caption={caption}>
      <Table.Row>
        <Table.CellHeader>{t('tabular.dateHeading')}</Table.CellHeader>
        <Table.CellHeader>{t('tabular.valueHeading')}</Table.CellHeader>
      </Table.Row>
      {rows.map(({ date, value }) => (
        <Table.Row key={date}>
          <Table.CellHeader>{t('tabular.date', { value: date })}</Table.CellHeader>
          <Table.Cell>{value}</Table.Cell>
        </Table.Row>
      ))}
    </Table>
  )
}

export default TopicTable
