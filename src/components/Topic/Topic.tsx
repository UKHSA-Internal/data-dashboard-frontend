import TopicTable from './TopicTable'
import { ChartContainer, Container, DataTableDropDown } from './Topic.styles'
import Image from 'next/image'

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
      <DataTableDropDown
        summary="View data in a tabular format"
        data-testid="ukhsa-tabledropdown"
      >
        <TopicTable caption={`Monthly ${name} cases`} data={points} />
      </DataTableDropDown>
    </Container>
  )
}

export default Topic
