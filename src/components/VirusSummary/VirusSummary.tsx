import { FC } from 'react';
import styled from 'styled-components';
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button, Paragraph } from 'govuk-react';

const Container = styled.div`
    /* width: 100%; */
    height: 450px;
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
    margin-left: 85px;
`;

const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
`;

interface IProps {
    virus: string;
    descrpition: string;
    points: Array<{ value: number }>;
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
                <ResponsiveContainer>
                    <AreaChart data={points}>
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#000" fill="#DFDFDF" dot={{fill: '#000', fillOpacity: 1}} />
                        <YAxis label={{ value: "Incidence rate per 100,000 population", angle: -90  }} tick={false} axisLine={false} />
                        <XAxis label={{ value: "Week Number" }} tick={false} axisLine={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Container>
    );
}

export default VirusSummary;