import { render, within } from '@/config/test-utils'

import { List } from './List'

test('renders components within a list', () => {
  const { getByRole } = render(
    <List>
      <li>Test list item</li>
    </List>
  )

  expect(
    within(getByRole('list'))
      .getAllByRole('listitem')
      .find((listitem) => listitem.textContent === 'Test list item')
  ).toBeInTheDocument()
})
