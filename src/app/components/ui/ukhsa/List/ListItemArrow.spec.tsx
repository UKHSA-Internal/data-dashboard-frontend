import { render } from '@testing-library/react'

import { ListItemArrowLink } from './ListItemArrow'

test('renders children within a list item', async () => {
  const { getByRole } = render(
    await ListItemArrowLink({ href: '/list-item-arrow', children: 'List item arrow link content' })
  )

  expect(getByRole('link', { name: 'List item arrow link content' })).toHaveAttribute('href', '/list-item-arrow')
  expect(getByRole('link', { name: 'List item arrow link content' })).toHaveClass('before:bg-list_item_arrow')
})
