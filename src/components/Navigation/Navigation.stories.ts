import type { Meta, StoryObj } from '@storybook/react'

import { Navigation } from './Navigation'

const meta = {
  title: 'Components/Navigation/Navigation',
  component: Navigation,
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>

export default meta

type Story = StoryObj<typeof Navigation>

export const Primary: Story = {
  args: {},
}
