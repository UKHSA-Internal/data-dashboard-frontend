import { Table } from './VirusSummaryTable.styles'

interface VirusSummaryTableProps {
  caption: string
  data: Array<{ date: string; value: number }>
}

const VirusSummaryTable = ({ caption, data }: VirusSummaryTableProps) => {
  return (
    <Table caption={caption}>
      <Table.Row>
        <Table.CellHeader>Month</Table.CellHeader>
        <Table.CellHeader>Amount</Table.CellHeader>
      </Table.Row>
      {data.map((point, key) => (
        <Table.Row key={key}>
          <Table.CellHeader>{point.date}</Table.CellHeader>
          <Table.Cell>{point.value}</Table.Cell>
        </Table.Row>
      ))}
    </Table>
  )
}

export default VirusSummaryTable
