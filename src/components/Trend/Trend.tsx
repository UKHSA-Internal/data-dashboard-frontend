import { Tag } from './Trend.styles'

interface TrendProps {
  positive: boolean
  value: string
}

const Trend = ({ positive, value }: TrendProps) => {
  return <Tag tint={positive ? 'GREEN' : 'RED'}>{value}</Tag>
}

export default Trend
