import TopicTable from './TopicTable'
import { ChartContainer, Container, TabularData } from './Topic.styles'
import Image from 'next/image'
import { TopicName } from '@/api/requests/stats/getStats'

interface TopicProps {
  description: string
  topic: TopicName
  category: string
  name: string
  points: Array<{ date: string; value: number }>
  image?: string
}

const getImageSrc = (topic: TopicName, category: string): string => {
  if (process.env.NEXT_PUBLIC_USE_CHART_MOCKS == 'enabled') {
    return `/img/${topic}_${category}.svg`
  }

  return `/charts/${topic}/${category}`
}

const Topic = ({ description, topic, category, name, points, image }: TopicProps) => {
  return (
    <Container>
      <ChartContainer>
        <Image alt={description} fill sizes="100vw" src={image ? image : getImageSrc(topic, category)} />
      </ChartContainer>
      <TabularData summary="View data in a tabular format">
        <TopicTable caption={`Monthly ${name} cases`} data={points} />
      </TabularData>
    </Container>
  )
}

export default Topic
