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

      {/* <TabularData summary="View data in a tabular format">
        <TopicTable
          caption={`Monthly cases`}
          data={[
            {
              date: 'Jan 23',
              value: 12,
            },
          ]}
        />
      </TabularData> */}
    </Container>
  )
}

export default Chart
