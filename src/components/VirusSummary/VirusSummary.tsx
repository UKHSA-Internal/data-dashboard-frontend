import { Button, Paragraph } from 'govuk-react'
import VirusSummaryTable from './VirusSummaryTable'
import {
  ChartContainer,
  Container,
  DataTableDropDown,
  LabelContainer,
  Title,
  Header,
} from './VirusSummary.styles'
import RouterLink from 'next/link'

interface VirusSummaryProps {
  virus: string
  description: string
  points: Array<{ date: string; value: number }>
}

const VirusSummary = ({ virus, description, points }: VirusSummaryProps) => {
  return (
    <Container>
      <Header>
        <RouterLink href={`/viruses/${virus}`} passHref legacyBehavior>
          <Title>{virus}</Title>
        </RouterLink>
        <Button
          buttonColour="#F3F2F1"
          buttonTextColour="#000000"
          data-testid="ukhsa-downloadButton"
        >
          Download
        </Button>
      </Header>
      <LabelContainer data-testid="ukhsa-description">
        <Paragraph>{`**${description}**`}</Paragraph>
      </LabelContainer>
      <ChartContainer></ChartContainer>
      <DataTableDropDown
        summary="View data in a tabular format"
        data-testid="ukhsa-tabledropdown"
      >
        <VirusSummaryTable caption={`Monthly ${virus} cases`} data={points} />
      </DataTableDropDown>
    </Container>
  )
}

export default VirusSummary
