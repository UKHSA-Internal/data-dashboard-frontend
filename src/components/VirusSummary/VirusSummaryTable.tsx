import { Table } from 'govuk-react';
import { FC } from 'react';

interface IProps {
    data: Array<{ date: string, value: number }>;
}

const VirusSummaryTable: FC<IProps> = ({ data }) => {
    return (
        <Table>
            <Table.Row>
                <Table.CellHeader>Month</Table.CellHeader>
                <Table.CellHeader>Amount</Table.CellHeader>
            </Table.Row>
            {data.map((point) => (
                <Table.Row>
                    <Table.CellHeader>{point.date}</Table.CellHeader>
                    <Table.Cell>{point.value}</Table.Cell>
                </Table.Row>
            ))}
        </Table>
    )
};

export default VirusSummaryTable;