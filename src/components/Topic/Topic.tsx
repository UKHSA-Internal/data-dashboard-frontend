import TopicTable from './TopicTable'
import { ChartContainer, Container, TabularData } from './Topic.styles'
import Image from 'next/image'

interface TopicProps {
  name: string
  description: string
  image?: string
  points: Array<{ date: string; value: number }>
}

const Topic = ({ name, description, image = '/temp-chart.png', points }: TopicProps) => {
  return (
    <Container>
      <ChartContainer>
        <Image alt={description} fill sizes="100vw" src={image} />
      </ChartContainer>
      <TabularData summary="View data in a tabular format">
        <TopicTable caption={`Monthly ${name} cases`} data={points} />
      </TabularData>
    </Container>
  )
}

export default Topic
