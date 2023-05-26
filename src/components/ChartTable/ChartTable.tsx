import { useTranslation } from 'next-i18next'
import { Details } from 'govuk-react'
import { Table } from './ChartTable.styles'

interface ChartTableProps {
  caption: string
  rows: Array<{ date: string; value: number }>
}

export const ChartTable = ({ caption, rows }: ChartTableProps) => {
  const { t } = useTranslation('topic')

  return (
    <Details summary={t('tabular.toggle')} aria-label={t('tabular.toggle')}>
      <Table caption={caption}>
        <Table.Row>
          <Table.CellHeader>{t('tabular.dateHeading')}</Table.CellHeader>
          <Table.CellHeader>{t('tabular.valueHeading')}</Table.CellHeader>
        </Table.Row>
        {rows.map(({ date, value }) => (
          <Table.Row key={date}>
            <Table.CellHeader>{t('tabular.date', { value: date })}</Table.CellHeader>
            <Table.Cell>{t('tabular.data', { value: value })}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </Details>
  )
}
