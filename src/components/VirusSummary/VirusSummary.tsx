import { FC } from 'react';
// import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button,  Heading, Paragraph } from 'govuk-react';
import VirusSummaryTable from './VirusSummaryTable';
import { ChartContainer, Container, DataTableDropDown, LabelContainer, Title } from './VirusSummary.styles';

interface IProps {
    virus: string;
    descrpition: string;
    points: Array<{ date: string, value: number }>;
}

const VirusSummary: FC<IProps> = ({ virus, descrpition, points }) => {
    return (
        <Container>
            <Title href={`/viruses/${virus}`} data-testid="ukhsa-title">{virus}</Title>
            <Button buttonColour='#F3F2F1' buttonTextColour='#000000' data-testid="ukhsa-downloadButton">Download</Button>
            <LabelContainer data-testid="ukhsa-description">
                <Paragraph>{`**${descrpition}**`}</Paragraph>
            </LabelContainer>
            <ChartContainer>
                {/* <ResponsiveContainer width="99%">
                    <AreaChart data={points}>
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#000" fill="#DFDFDF" dot={{fill: '#000', fillOpacity: 1}} />
                        <XAxis dataKey={"date"} label={{ value: "Week Number" }} tick={false} axisLine={false} />
                        <YAxis dataKey={"value"} label={{ value: "Incidence rate per 100,000 population", angle: -90  }} tick={false} axisLine={false} />
                    </AreaChart>
                </ResponsiveContainer> */}
            </ChartContainer>
            <DataTableDropDown summary="View data in a tabular format" data-testid="ukhsa-tabledropdown">
                <Heading size="M" data-testid="ukhsa-dropdownheading">{`Monthly ${virus} cases`}</Heading>
                <VirusSummaryTable data={points} />
            </DataTableDropDown>
        </Container>
    );
}

export default VirusSummary;