import { ChartContainer, Container, TabularData } from './Chart.styles'
import Image from 'next/image'
// import TopicTable from './ChartTable'
// import { getTabular } from '@/api/requests/tabular/getTabular'

interface ChartProps {
  src: string
}

export const Chart = async ({ src }: ChartProps) => {
  // const tabularData = await getTabular({ topic: 'COVID-19', metric: 'new_cases_daily' })
  // console.log()
  //success: true,
  // Data: {
  //  date: x
  //  value: y
  // }

  Expect: return (
    <Container>
      <ChartContainer>
        <Image priority unoptimized alt="" fill sizes="100vw" src={src} />
      </ChartContainer>

      <TabularData summary="View data in a tabular format">
        {/* <TopicTable caption={`Monthly cases`} data={tabularData.data} /> */}
      </TabularData>
    </Container>
  )
}

export default Chart
