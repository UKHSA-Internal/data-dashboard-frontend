import type { Meta, StoryObj } from '@storybook/react'

import { relatedLinksMock } from '@/api/mocks/cms/data/elements'

import { RelatedLinks } from './RelatedLinks'

const meta = {
  title: 'Components/RelatedLinks',
  component: RelatedLinks,
  tags: ['autodocs'],
} satisfies Meta<typeof RelatedLinks>

export default meta

type Story = StoryObj<typeof RelatedLinks>

export const Primary: Story = {
  args: {
    links: relatedLinksMock,
  },
}
