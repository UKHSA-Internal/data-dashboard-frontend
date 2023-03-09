import { Table } from 'govuk-react';

interface VirusSummaryTableProps {
    data: Array<{ date: string, value: number }>;
}

const VirusSummaryTable = ({ data }: VirusSummaryTableProps) => {
    return (
        <Table>
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
};

export default VirusSummaryTable;