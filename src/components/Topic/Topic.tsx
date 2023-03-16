import TopicTable from './TopicTable'
import { ChartContainer, Container } from './Topic.styles'
import Image from 'next/image'
import { Details } from 'govuk-react'

interface TopicProps {
  name: string
  description: string
  points: Array<{ date: string; value: number }>
}

const Topic = ({ name, description, points }: TopicProps) => {
  return (
    <Container>
      <ChartContainer>
        <Image alt={description} fill sizes="100vw" src="/temp-chart.png" />
      </ChartContainer>
      <Details summary="View data in a tabular format">
        <TopicTable caption={`Monthly ${name} cases`} data={points} />
      </Details>
    </Container>
  )
}

export default Topic
