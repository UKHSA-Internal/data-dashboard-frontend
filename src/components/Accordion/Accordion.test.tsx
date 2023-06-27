import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from '@/components/Accordion/Accordion'

const getComponent = () => (
  <div className="js-enabled">
    <Accordion containerProps={{ 'data-testid': 'test-accordion' }}>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Here is a title</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>And here is the content</AccordionItemPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Second title</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>More content</AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  </div>
)

test('Displays the accordion headings and hides all content by default', () => {
  render(getComponent())

  expect(screen.getByRole('button', { name: /Here is a title/ })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Second title/ })).toBeInTheDocument()

  expect(screen.getAllByText('Show')).toHaveLength(2)

  expect(screen.getByText('And here is the content')).not.toBeVisible()
  expect(screen.getByText('More content')).not.toBeVisible()
})

test('Shows the content when clicking the heading', async () => {
  const user = userEvent.setup()
  render(getComponent())

  const heading = screen.getByRole('button', { name: /Here is a title/ })
  expect(heading).toHaveAttribute('aria-expanded', 'false')

  await user.click(heading)

  expect(heading).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('And here is the content')).toBeVisible()
})

test('Supports multiple panels being open', async () => {
  const user = userEvent.setup()
  render(getComponent())

  await user.click(screen.getByRole('button', { name: /Here is a title/ }))
  await user.click(screen.getByRole('button', { name: /Second title/ }))

  expect(screen.getByText('And here is the content')).toBeVisible()
  expect(screen.getByText('More content')).toBeVisible()
})

test('Toggles all panels expanded when clicking the Show all sections button', async () => {
  const user = userEvent.setup()
  render(getComponent())

  await user.click(screen.getByRole('button', { name: /Show all sections/ }))

  expect(screen.getByText('And here is the content')).toBeVisible()
  expect(screen.getByText('More content')).toBeVisible()

  await user.click(screen.getByRole('button', { name: /Hide all sections/ }))

  expect(screen.getByText('And here is the content')).not.toBeVisible()
  expect(screen.getByText('More content')).not.toBeVisible()
})

test('Supports custom props (e.g. test attributes)', () => {
  render(getComponent())
  expect(screen.getByTestId('test-accordion')).toBeInTheDocument()
})
