import { render } from '@/config/test-utils'

import { ListItemArrow, ListItemArrowLink, ListItemArrowParagraph } from './ListItemArrow'

test('renders relative container around children', async () => {
  const { getByText } = render(await ListItemArrow({ children: 'list item arrow' }))

  expect(getByText('list item arrow')).toHaveClass('govuk-!-padding-right-3 relative')
})

test('renders govuk body', async () => {
  const { getByText } = render(await ListItemArrowParagraph({ children: 'list item paragraph' }))

  expect(getByText('list item paragraph')).toHaveClass('govuk-body-m')
})

test('renders children within a list item', async () => {
  const { getByRole } = render(
    await ListItemArrowLink({ href: '/list-item-arrow', children: 'List item arrow link content' })
  )

  expect(getByRole('link', { name: 'List item arrow link content' })).toHaveAttribute('href', '/list-item-arrow')
  expect(getByRole('link', { name: 'List item arrow link content' })).toHaveClass('before:bg-list_item_arrow')
})
