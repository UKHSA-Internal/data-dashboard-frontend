import type { Meta, StoryObj } from '@storybook/react'

import { NavigationLink } from './NavigationLink'

const meta = {
  title: 'Components/Navigation/NavigationLink',
  component: NavigationLink,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationLink>

export default meta

type Story = StoryObj<typeof NavigationLink>

export const Primary: Story = {
  args: {
    title: 'Coronavirus',
    url: '#',
    type: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    title: 'About',
    url: '#',
    type: 'secondary',
  },
}
