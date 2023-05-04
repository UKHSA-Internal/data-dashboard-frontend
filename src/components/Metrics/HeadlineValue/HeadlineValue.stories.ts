import type { Meta, StoryObj } from '@storybook/react'

import { HeadlineValue } from './HeadlineValue'

const meta: Meta<typeof HeadlineValue> = {
  title: 'Components/Metrics/HeadlineValue',
  component: HeadlineValue,
  tags: ['autodocs'],
} satisfies Meta<typeof HeadlineValue>

export default meta

type Story = StoryObj<typeof HeadlineValue>

export const Primary: Story = {
  args: {
    heading: 'Patients admitted',
    value: 6288,
  },
}
