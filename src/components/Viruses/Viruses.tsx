import { FC } from 'react';
import styled from 'styled-components';
import VirusSummary from '../VirusSummary/VirusSummary';

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
`;

const Viruses: FC = () => {
    return (
        <Container>
            <VirusSummary virus='Influenza' />
            <VirusSummary virus='SARS-Cov-2' />
            <VirusSummary virus='RSV' />
        </Container>
    )
};

export default Viruses;