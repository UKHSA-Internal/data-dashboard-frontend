import type { Meta, StoryObj } from '@storybook/react'

import { DownloadLink } from './DownloadLink'

const meta = {
  title: 'Components/DownloadLink',
  component: DownloadLink,
  tags: ['autodocs'],
} satisfies Meta<typeof DownloadLink>

export default meta

type Story = StoryObj<typeof DownloadLink>

export const Primary: Story = {
  args: {
    children: 'Download',
    href: '#',
  },
}
