import { render } from '@testing-library/react'

import { ListItem } from './ListItem'

test('renders children within a list item', async () => {
  const { getAllByRole } = render(await ListItem({ children: 'List item content test' }))

  expect(
    getAllByRole('listitem').find((listitem) => listitem.textContent === 'List item content test')
  ).toBeInTheDocument()
})
