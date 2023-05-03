import type { Meta, StoryObj } from '@storybook/react'

import { Text } from './Text'

const meta = {
  title: 'CMS Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {},
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof Text>

export const Primary: Story = {
  args: {
    children: '<p>The <strong>Text Card</strong> will <em>automatically</em> parse HTML received from the CMS</p>',
  },
}
