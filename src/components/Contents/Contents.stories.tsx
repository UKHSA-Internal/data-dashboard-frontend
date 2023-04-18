import type { Meta, StoryObj } from '@storybook/react'
import { Contents, ContentsItem } from './Contents'

const component = () => {
  return (
    <Contents>
      <ContentsItem heading="Coronavirus">
        <div>Coronavirus page content</div>
      </ContentsItem>
      <ContentsItem heading="Influenza">
        <div>Influenza page content</div>
      </ContentsItem>
      <ContentsItem heading="RSV">
        <div>RSV page content</div>
      </ContentsItem>
    </Contents>
  )
}

const meta = {
  title: 'Components/Contents',
  component,
  tags: ['autodocs'],
} satisfies Meta<typeof Contents>

export default meta

type Story = StoryObj<typeof Contents>

export const Primary: Story = {
  args: {},
}
