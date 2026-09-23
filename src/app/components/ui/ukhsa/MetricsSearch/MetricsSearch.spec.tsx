import { userEvent } from '@testing-library/user-event'

import { render, waitFor } from '@/config/test-utils'

import MetricsSearch from './MetricsSearch'

let replaceMock: jest.Mock

beforeEach(() => {
  replaceMock = jest.fn((url: string) => {
    window.location.href = url
  })
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      href: 'http://localhost/metrics-documentation',
      replace: replaceMock,
    },
  })
  console.error = jest.fn()
})

afterEach(() => {
  jest.resetAllMocks()
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
  window.location.href = 'http://localhost/metrics-documentation?search=Mock+search+value'

  const { getByLabelText } = render(<MetricsSearch value="Mock search value" />)

  await waitFor(() => {
    expect(getByLabelText('Metric name')).toHaveValue('Mock search value')
  })

  expect(replaceMock).not.toHaveBeenCalled()
})

test('reloads the document with the search input in the url when typing', async () => {
  const { getByLabelText } = render(<MetricsSearch value="" />)

  await userEvent.type(getByLabelText('Metric name'), 'Mock search value')

  await waitFor(() => {
    expect(replaceMock).toHaveBeenCalledWith('http://localhost/metrics-documentation?search=Mock+search+value')
  })
})

test('clears the url state and search input when clicking the "Clear" link', async () => {
  const { getByRole, getByLabelText } = render(<MetricsSearch value="" />)

  await userEvent.type(getByRole('textbox', { name: 'Metric name' }), 'Mock search value')

  await waitFor(() => {
    expect(replaceMock).toHaveBeenCalledWith('http://localhost/metrics-documentation?search=Mock+search+value')
  })

  await userEvent.click(getByRole('link', { name: 'Clear' }))

  await waitFor(() => {
    expect(replaceMock).toHaveBeenLastCalledWith('http://localhost/metrics-documentation?search=')
  })

  expect(getByLabelText('Metric name')).toHaveValue('')
})

test('clears the url state when the search input is cleared (via keyboard e.g backspace)', async () => {
  const { getByLabelText } = render(<MetricsSearch value="" />)

  await userEvent.type(getByLabelText('Metric name'), 'Mock search value')

  await waitFor(() => {
    expect(replaceMock).toHaveBeenCalledWith('http://localhost/metrics-documentation?search=Mock+search+value')
  })

  await userEvent.clear(getByLabelText('Metric name'))

  await waitFor(() => {
    expect(replaceMock).toHaveBeenLastCalledWith('http://localhost/metrics-documentation?search=')
  })

  expect(getByLabelText('Metric name')).toHaveValue('')
})
