import type { Meta, StoryObj } from '@storybook/react'

import { HeadlineTrend } from './HeadlineTrend'

const meta = {
  title: 'Components/Metrics/HeadlineTrend',
  component: HeadlineTrend,
  tags: ['autodocs'],
} satisfies Meta<typeof HeadlineTrend>

export default meta

type Story = StoryObj<typeof HeadlineTrend>

export const PositiveTrendUp: Story = {
  args: {
    heading: 'Last 7 days',
    value: '692 (3.0%)',
    direction: 'up',
    colour: 'green',
  },
}

export const PositiveTrendDown: Story = {
  args: {
    heading: 'Last 7 days',
    value: '692 (-3.0%)',
    direction: 'down',
    colour: 'green',
  },
}

export const NegativeTrendUp: Story = {
  args: {
    heading: 'Last 7 days',
    value: '692 (3.0%)',
    direction: 'up',
    colour: 'red',
  },
}

export const NegativeTrendDown: Story = {
  args: {
    heading: 'Last 7 days',
    value: '692 (-3.0%)',
    direction: 'down',
    colour: 'red',
  },
}

export const NeutralTrend: Story = {
  args: {
    heading: 'Last 7 days',
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
