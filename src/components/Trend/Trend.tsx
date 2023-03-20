import { Container } from './Trend.styles'

interface TrendProps {
  positive: boolean
  value: string
}

const Trend = ({ positive, value }: TrendProps) => {
  return <Container positive={positive}>{value}</Container>
}

export default Trend
