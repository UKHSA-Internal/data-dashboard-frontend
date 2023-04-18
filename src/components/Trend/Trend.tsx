import { Tag } from './Trend.styles'
import { COLOURS } from '@/styles/Theme'
import { BLACK } from 'govuk-colours'

interface TrendProps {
  colour: string
  direction: string
  value: string
}

type TintVariants = 'GREEN' | 'RED'

const tints: Record<string, TintVariants> = {
  green: 'GREEN',
  red: 'RED',
}

const neutralProps: Record<string, string> = {
  backgroundColor: COLOURS.WHITE,
  color: BLACK,
}

export const Trend = ({ colour, direction, value }: TrendProps) => {
  const isNeutral = colour === 'neutral'

  return (
    <Tag
      {...(isNeutral && neutralProps)}
      {...(!isNeutral && { tint: tints[colour] })}
      direction={direction}
      colour={colour}
    >
      {value}
    </Tag>
  )
}
