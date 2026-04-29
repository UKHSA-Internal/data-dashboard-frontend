import userEvent from '@testing-library/user-event'

import { searchPages } from '@/api/requests/cms/searchPages'
import { render, waitFor } from '@/config/test-utils'

import Search from './Search'

jest.mock('@/api/requests/cms/searchPages')

const searchPagesMock = searchPages as jest.Mock

const mockResults = [
  {
    title: 'Result 1',
    meta: {
      html_url: '/result-1',
    },
  },
  {
    title: 'Result 2',
    meta: {
      html_url: '/result-2',
    },
  },
]

beforeEach(() => {
  jest.clearAllMocks()
  searchPagesMock.mockImplementation(async () => ({
    success: true,
    data: {
      items: mockResults,
      meta: { total_count: 2 },
    },
  }))
})

test('renders a labelled search form and combobox', () => {
  const { getByRole } = render(<Search placeholder="Search for content" label="Site search" />)

  expect(getByRole('form', { name: 'Site search' })).toBeVisible()
  expect(getByRole('combobox')).toHaveAttribute('placeholder', 'Search for content')
})

test('fetches and displays results when user types', async () => {
  const { getByRole, findByRole } = render(<Search placeholder="Search" label="Search" />)

  await userEvent.type(getByRole('combobox'), 'covid')

  await waitFor(() => {
    expect(searchPagesMock).toHaveBeenCalledWith({ limit: '5', search: 'covid' })
  })

  expect(await findByRole('link', { name: 'Result 1' })).toBeVisible()
  expect(getByRole('link', { name: 'Result 2' })).toBeVisible()
})

test('hides dropdown when clicking outside', async () => {
  const { getByRole, queryByRole, findByRole } = render(
    <div>
      <Search placeholder="Search" label="Search" />
      <button type="button">Outside</button>
    </div>
  )

  await userEvent.type(getByRole('combobox'), 'query')
  expect(await findByRole('list', { name: 'Search results' })).toBeVisible()

  await userEvent.click(getByRole('button', { name: 'Outside' }))

  await waitFor(() => {
    expect(queryByRole('list', { name: 'Search results' })).not.toBeInTheDocument()
  })
})

test('clears the input and closes results with clear button', async () => {
  const { getByRole, findByRole, queryByRole } = render(<Search placeholder="Search" label="Search" />)

  const input = getByRole('combobox')
  await userEvent.type(input, 'query')
  expect(await findByRole('link', { name: 'Result 1' })).toBeVisible()

  await userEvent.click(getByRole('button', { name: 'Clear search' }))

  expect(input).toHaveValue('')
  expect(queryByRole('list', { name: 'Search results' })).not.toBeInTheDocument()
  expect(input).toHaveFocus()
})

test('supports keyboard navigation through results and wraps around', async () => {
  const { getByRole, findByRole } = render(<Search placeholder="Search" label="Search" />)

  const input = getByRole('combobox')
  await userEvent.type(input, 'query')
  await findByRole('link', { name: 'Result 1' })

  await userEvent.keyboard('{ArrowDown}')
  expect(getByRole('link', { name: 'Result 1' })).toHaveFocus()

  await userEvent.keyboard('{ArrowDown}')
  expect(getByRole('link', { name: 'Result 2' })).toHaveFocus()

  await userEvent.keyboard('{ArrowDown}')
  expect(getByRole('link', { name: 'Result 1' })).toHaveFocus()
})

test('supports upward keyboard navigation from the input and wraps to the last result', async () => {
  const { getByRole, findByRole } = render(<Search placeholder="Search" label="Search" />)

  const input = getByRole('combobox')
  await userEvent.type(input, 'query')
  await findByRole('link', { name: 'Result 1' })

  await userEvent.keyboard('{ArrowUp}')

  expect(getByRole('link', { name: 'Result 2' })).toHaveFocus()
})

test('supports upward keyboard navigation between results and wraps around', async () => {
  const { getByRole, findByRole } = render(<Search placeholder="Search" label="Search" />)

  const input = getByRole('combobox')
  await userEvent.type(input, 'query')
  await findByRole('link', { name: 'Result 1' })

  await userEvent.keyboard('{ArrowDown}')
  expect(getByRole('link', { name: 'Result 1' })).toHaveFocus()

  await userEvent.keyboard('{ArrowUp}')
  expect(getByRole('link', { name: 'Result 2' })).toHaveFocus()

  await userEvent.keyboard('{ArrowUp}')
  expect(getByRole('link', { name: 'Result 1' })).toHaveFocus()
})

test('closes results with escape from input', async () => {
  const { getByRole, queryByRole, findByRole } = render(<Search placeholder="Search" label="Search" />)

  const input = getByRole('combobox')
  await userEvent.type(input, 'query')
  await findByRole('link', { name: 'Result 1' })

  await userEvent.keyboard('{Escape}')

  expect(input).toHaveFocus()
  await waitFor(() => {
    expect(queryByRole('list', { name: 'Search results' })).not.toBeInTheDocument()
  })
})

test('closes results with escape from a focused result and returns focus to the input', async () => {
  const { getByRole, findByRole } = render(<Search placeholder="Search" label="Search" />)

  const input = getByRole('combobox')
  await userEvent.type(input, 'query')
  await findByRole('link', { name: 'Result 1' })

  await userEvent.keyboard('{ArrowDown}')
  expect(getByRole('link', { name: 'Result 1' })).toHaveFocus()

  await userEvent.keyboard('{Escape}')

  expect(input).toHaveFocus()
  expect(input).not.toHaveAttribute('aria-activedescendant')
})

test('renders input and buttons', () => {
  const { getByRole } = render(<Search placeholder="Search" label="Search" />)

  const form = getByRole('form', { name: 'Search' })

  expect(form).toBeVisible()
  expect(form).toHaveAttribute('method', 'GET')
  expect(getByRole('combobox')).toBeVisible()
})

test('searching displays results', async () => {
  const { getByRole, findByRole } = render(<Search placeholder="Search" label="Search" />)

  await userEvent.type(getByRole('combobox'), 'query')
  expect(getByRole('combobox')).toHaveValue('query')
  expect(await findByRole('link', { name: 'Result 1' })).toBeVisible()
})

test('searching uses correct query', async () => {
  const query = 'query'
  const search = render(<Search placeholder="Search" label="Search" />)
  const { getByRole, findByRole } = search

  await userEvent.type(getByRole('combobox'), query)
  await findByRole('link', { name: 'Result 1' })

  expect(searchPagesMock).toHaveBeenCalledTimes(1)
  expect(searchPagesMock).toHaveBeenCalledWith({ limit: '5', search: query })
})
