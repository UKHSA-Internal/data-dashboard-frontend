import type { Meta, StoryObj } from '@storybook/react'

import { Layout } from './Layout'

const meta = {
  title: 'Components/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Layout>

export default meta

type Story = StoryObj<typeof Layout>

export const Primary: Story = {
  args: {
    children: 'Child content',
  },
}
