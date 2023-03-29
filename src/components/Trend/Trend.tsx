import { Tag } from './Trend.styles'

interface TrendProps {
  colour: string
  direction: string
  value: string
}

const Trend = ({ colour, direction, value }: TrendProps) => {
  return (
    <Tag tint={colour === 'green' ? 'GREEN' : 'RED'} direction={direction} colour={colour}>
      {value}
    </Tag>
  )
}

export default Trend
