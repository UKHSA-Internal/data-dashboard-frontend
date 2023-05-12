import { z } from 'zod'

export const ChartLineColours = z.enum([
  '',
  'WHITE',
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'DARK_BLUE',
  'LIGHT_BLUE',
  'PURPLE',
  'BLACK',
  'DARK_GREY',
  'MID_GREY',
  'LIGHT_GREY',
  'LIGHT_PURPLE',
  'BRIGHT_PURPLE',
  'PINK',
  'LIGHT_PINK',
  'ORANGE',
  'BROWN',
  'LIGHT_GREEN',
  'TURQUOISE',
])

export type ChartLineColours = z.infer<typeof ChartLineColours>
