import { render } from '@testing-library/react'

import { ListItem } from './ListItem'

test('renders children within a list item', async () => {
  const { getAllByRole, queryByRole } = render(await ListItem({ children: 'List item content test', showRule: false }))

  expect(
    getAllByRole('listitem').find((listitem) => listitem.textContent === 'List item content test')
  ).toBeInTheDocument()

  expect(queryByRole('separator')).not.toBeInTheDocument()
})

test('shows horizontal rule', async () => {
  const { getByRole } = render(await ListItem({ children: 'List item content test' }))

  expect(getByRole('separator')).toBeInTheDocument()
})
