import Image from 'next/image'

import { ChartContainer, Container } from './Chart.styles'

interface ChartProps {
  src: string
}

export const Chart = ({ src }: ChartProps) => {
  return (
    <Container>
      <ChartContainer>
        <Image priority unoptimized alt="" fill sizes="100vw" src={src} />
      </ChartContainer>
    </Container>
  )
}

export default Chart
