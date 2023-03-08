import { FC } from 'react';
import styled from 'styled-components';
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button, Details, Heading, Paragraph } from 'govuk-react';
import VirusSummaryTable from './VirusSummaryTable';

const Container = styled.div`
    background: #F8F8F8;
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Title = styled.a`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1d70b8;
`;

const LabelContainer = styled.div`
    margin-left: 75px;
`;

const ChartContainer = styled.div`
    width: 100%;
    height: 220px;
    margin-bottom: 30px;
`;

const DataTableDropDown = styled(Details)`
    width: 100%;
`;

interface IProps {
    virus: string;
    descrpition: string;
    points: Array<{ date: string, value: number }>;
}

const VirusSummary: FC<IProps> = ({ virus, descrpition, points }) => {
    console.log("points", points);
    // debugger;

    return (
        <Container>
            <Title href={`/viruses/${virus}`}>{virus}</Title>
            <Button buttonColour='#F3F2F1' buttonTextColour='#000000'>Download</Button>
            <LabelContainer>
                <Paragraph>{`**${descrpition}**`}</Paragraph>
            </LabelContainer>
            <ChartContainer>
                <ResponsiveContainer width="99%">
                    <AreaChart data={points}>
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#000" fill="#DFDFDF" dot={{fill: '#000', fillOpacity: 1}} />
                        <XAxis dataKey={"date"} label={{ value: "Week Number" }} tick={false} axisLine={false} />
                        <YAxis dataKey={"value"} label={{ value: "Incidence rate per 100,000 population", angle: -90  }} tick={false} axisLine={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>
            <DataTableDropDown summary="View data in a tabular format">
                <Heading size="M">Montly {virus} cases</Heading>
                <VirusSummaryTable data={points} />
            </DataTableDropDown>
        </Container>
    );
}

export default VirusSummary;