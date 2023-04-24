import { ChartContainer, Container } from './Chart.styles'
import Image from 'next/image'

interface ChartProps {
  src: string
}

export const Chart = ({ src }: ChartProps) => {
  return (
    <Container>
      <ChartContainer>
        <Image priority unoptimized alt="" fill sizes="100vw" src={src} />
      </ChartContainer>
      {/* TODO: Commented out the below until this is re-implemented JIRA: CDD-534 */}
      {/* <TabularData summary="View data in a tabular format">
        <TopicTable caption={`Monthly ${name} cases`} data={points} />
      </TabularData> */}
    </Container>
  )
}

export default Chart
