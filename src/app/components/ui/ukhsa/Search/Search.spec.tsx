import { userEvent } from '@testing-library/user-event'

import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { render, waitFor } from '@/config/test-utils'

import Search from './Search'

beforeEach(() => {
  mockRouter.push('/metrics-documentation')
  console.error = jest.fn()
})

test('renders input and buttons', async () => {
  const { getByRole } = render(
    <Search
      href="/metrics-documentation"
      searchTitle="Metric name"
      searchLabel="Metrics search"
      noScriptButtonText="Metric name"
      clearText="Clear"
      inlineResults={false}
    />
  )

  const form = getByRole('form', { name: 'Metrics search' })
  expect(form).toBeVisible()
  expect(form).toHaveAttribute('method', 'GET')
  expect(form).toHaveAttribute('action', '/metrics-documentation')

  expect(getByRole('textbox', { name: 'Metric name' })).toBeVisible()
  expect(getByRole('link', { name: 'Clear' })).toBeVisible()
})

test('sets the url state with the search input when typing', async () => {
  mockRouter.push('')

  const { getByLabelText } = render(
    <Search
      href="/metrics-documentation"
      searchTitle="Metric name"
      searchLabel="Metrics search"
      noScriptButtonText="Metric name"
      clearText="Clear"
      inlineResults={true}
    />
  )

  await userEvent.type(getByLabelText('Metric name'), 'Mock search value')

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })
})

test('clears the url state and search input when clicking the "Clear" link', async () => {
  const { getByRole, getByLabelText } = render(
    <Search
      href="/metrics-documentation"
      searchTitle="Metric name"
      searchLabel="Metrics search"
      noScriptButtonText="Metric name"
      clearText="Clear"
      inlineResults={false}
    />
  )

  await userEvent.type(getByRole('textbox', { name: 'Metric name' }), 'Mock search value')

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })

  await userEvent.click(getByRole('link', { name: 'Clear' }))

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/')
  })

  expect(getByLabelText('Metric name')).toHaveValue('')
})

test('clears the url state when the search input is cleared (via keyboard e.g backspace)', async () => {
  const { getByLabelText } = render(
    <Search
      href="/metrics-documentation"
      searchTitle="Metric name"
      searchLabel="Metrics search"
      noScriptButtonText="Metric name"
      clearText="Clear"
      inlineResults={false}
    />
  )

  await userEvent.type(getByLabelText('Metric name'), 'Mock search value')

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })

  await userEvent.clear(getByLabelText('Metric name'))

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/')
  })

  expect(getByLabelText('Metric name')).toHaveValue('')
})
