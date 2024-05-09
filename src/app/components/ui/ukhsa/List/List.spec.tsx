import { render, within } from '@testing-library/react'

import { List } from './List'

test('renders components within a list', async () => {
  const childItems = <li>Test list item</li>
  const { getByRole } = render(await List({ children: childItems }))

  expect(
    within(getByRole('list'))
      .getAllByRole('listitem')
      .find((listitem) => listitem.textContent === 'Test list item')
  ).toBeInTheDocument()
})
