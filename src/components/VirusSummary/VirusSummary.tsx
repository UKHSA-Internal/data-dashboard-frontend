import { FC } from 'react';
import styled from 'styled-components';
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    { cases: 10 },
    { cases: 12 },
    { cases: 13 },
    { cases: 15 },
    { cases: 18 },
    { cases: 24 },
    { cases: 21 },
    { cases: 26 },
    { cases: 28 },
    { cases: 29 },
    { cases: 32 },
    { cases: 35 },
    { cases: 40 },
    { cases: 41 },
    { cases: 37 },
    { cases: 50 },
    { cases: 40 }
  ];

const Container = styled.div`
    /* width: 100%; */
    height: 400px;
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

const Download = styled.button`
    background: #F3F2F1;
    padding: 10px;
    border: none;
    border-bottom: 2px solid grey;
    border-top: 2px solid #F3F2F1;
    cursor: pointer;
    
    &:hover {
        background: #dbdad9;
    }
`;

const SummaryText = styled.div`
    margin: 16px 0;
    width: 100%;
    font-weight: 700;
    margin-left: 25%;
`;

interface IProps {
    virus: string;
}

const VirusSummary: FC<IProps> = ({ virus }) => {
    return (
        <Container>
            <Title href={`/viruses/${virus}`}>{virus}</Title>
            <Download>Download</Download>
            <SummaryText>Chart showing the weekly incidence per 100,000 population of Flu in England</SummaryText>
            <ResponsiveContainer width="100%" maxHeight={300}>
                <AreaChart data={data}>
                    <Tooltip />
                    <Area type="monotone" dataKey="cases" stroke="#000" fill="#DFDFDF" dot={{fill: '#000', fillOpacity: 1}} />
                    <YAxis label={{ value: "Incidence rate per 100,000 population", angle: -90  }} tick={false} axisLine={false} />
                    <XAxis label={{ value: "Week Number" }} tick={false} axisLine={false} />
                </AreaChart>
            </ResponsiveContainer>
        </Container>
    );
}

export default VirusSummary;