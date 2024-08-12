import { userEvent } from '@testing-library/user-event'

import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { render, waitFor } from '@/config/test-utils'

import MetricsSearch from './MetricsSearch'

beforeEach(() => {
  mockRouter.push('/metrics-documentation')
  console.error = jest.fn()
})

test('renders input and buttons', async () => {
  const { getByRole } = render(<MetricsSearch value="" />)

  const form = getByRole('form', { name: 'Metrics search' })
  expect(form).toBeVisible()
  expect(form).toHaveAttribute('method', 'GET')
  expect(form).toHaveAttribute('action', '/metrics-documentation')

  expect(getByRole('textbox', { name: 'Metric name' })).toBeVisible()
  expect(getByRole('link', { name: 'Clear' })).toBeVisible()
})

test('defaults the search input value with the value set in the url state', async () => {
  mockRouter.push('/?search=Mock+search+value')

  const { getByLabelText } = render(<MetricsSearch value="Mock search value" />)

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })

  await waitFor(() => {
    expect(getByLabelText('Metric name')).toHaveValue('Mock search value')
  })
})

test('sets the url state with the search input when typing', async () => {
  mockRouter.push('')

  const { getByLabelText } = render(<MetricsSearch value="" />)

  await userEvent.type(getByLabelText('Metric name'), 'Mock search value')

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })
})

test('clears the url state and search input when clicking the "Clear" link', async () => {
  const { getByRole, getByLabelText } = render(<MetricsSearch value="" />)

  await userEvent.type(getByRole('textbox', { name: 'Metric name' }), 'Mock search value')

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })

  await userEvent.click(getByRole('link', { name: 'Clear' }))

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=')
  })

  expect(getByLabelText('Metric name')).toHaveValue('')
})

test('clears the url state when the search input is cleared (via keyboard e.g backspace)', async () => {
  const { getByLabelText } = render(<MetricsSearch value="" />)

  await userEvent.type(getByLabelText('Metric name'), 'Mock search value')

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })

  await userEvent.clear(getByLabelText('Metric name'))

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=')
  })

  expect(getByLabelText('Metric name')).toHaveValue('')
})
