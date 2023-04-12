import { ChartContainer, Container } from './Chart.styles'
import Image from 'next/image'

interface ChartProps {
  src: string
  fallback?: string
}

export const Chart = ({ src, fallback }: ChartProps) => {
  /**
   * In local dev environment, render a fallback image from the public directory so that we don't increase
   * page load time fetching from the real API.
   *
   * In production, we can pre-render the fetched SVG as a data URI to benefit from SSR/SSG
   */
  const getImageSrc = () => {
    if (process.env.NEXT_PUBLIC_USE_CHART_MOCKS == 'enabled') {
      return fallback ?? ''
    }
    return src
  }

  return (
    <Container>
      <ChartContainer>
        <Image priority unoptimized alt="" fill sizes="100vw" src={getImageSrc()} />
      </ChartContainer>
      {/* TODO: Commented out the below until this is re-implemented JIRA: CDD-534 */}
      {/* <TabularData summary="View data in a tabular format">
        <TopicTable caption={`Monthly ${name} cases`} data={points} />
      </TabularData> */}
    </Container>
  )
}

export default Chart
