import { render } from '@/config/test-utils'

import { Card } from './Card'

/**
 * Jest does not support RSC yet so we must await the component as a function
 */

test('renders the Card component with default className', async () => {
  const { container } = render(await Card({ children: 'Test Content' }))
  const cardElement = container.firstChild
  expect(cardElement).toHaveClass('govuk-!-padding-4 bg-grey-3')
})

test('renders the Card component with additional className', async () => {
  const { container } = render(await Card({ children: 'Test Content', className: 'custom-class' }))
  const cardElement = container.firstChild
  expect(cardElement).toHaveClass('govuk-!-padding-4 bg-grey-3 custom-class')
})

test('renders the Card component with provided children', async () => {
  const { getByText } = render(await Card({ children: 'Test Content' }))
  const contentElement = getByText('Test Content')
  expect(contentElement).toBeInTheDocument()
})
