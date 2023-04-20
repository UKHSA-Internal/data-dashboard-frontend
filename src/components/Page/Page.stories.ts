import type { Meta, StoryObj } from '@storybook/react'

import { Page } from './Page'

const meta = {
  title: 'Components/Page',
  component: Page,
  tags: ['autodocs'],
  parameters: {
    Page: 'fullscreen',
  },
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof Page>

export const Primary: Story = {
  args: {
    heading: 'Example Page',
    lastUpdated: new Date().toString(),
    children: 'Child content',
  },
}
