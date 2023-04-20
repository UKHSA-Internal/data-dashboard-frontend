import type { Meta, StoryObj } from '@storybook/react'

import { Trend } from './Trend'

const meta = {
  title: 'Components/Trend',
  component: Trend,
  tags: ['autodocs'],
} satisfies Meta<typeof Trend>

export default meta

type Story = StoryObj<typeof Trend>

export const PositiveTrendUp: Story = {
  args: {
    value: '692 (3.0%)',
    direction: 'up',
    colour: 'green',
  },
}

export const PositiveTrendDown: Story = {
  args: {
    value: '692 (-3.0%)',
    direction: 'down',
    colour: 'green',
  },
}

export const NegativeTrendUp: Story = {
  args: {
    value: '692 (3.0%)',
    direction: 'up',
    colour: 'red',
  },
}

export const NegativeTrendDown: Story = {
  args: {
    value: '692 (-3.0%)',
    direction: 'down',
    colour: 'red',
  },
}

export const NeutralTrend: Story = {
  args: {
    value: '1 (127.2%)',
    direction: 'neutral',
    colour: 'neutral',
  },
  parameters: {
    backgrounds: {
      default: 'grey',
    },
  },
}
