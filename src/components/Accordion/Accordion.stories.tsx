import type { Meta, StoryObj } from '@storybook/react'

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion/Accordion'

const component = () => {
  return (
    <div className="js-enabled">
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Symptoms</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>And here is the content</AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Transmission</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>More content</AccordionItemPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Treatment</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>More content</AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const meta = {
  title: 'Components/Accordion',
  component,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
  args: {},
}
