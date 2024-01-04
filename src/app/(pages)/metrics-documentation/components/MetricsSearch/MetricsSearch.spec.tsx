import { render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { mockRouter } from '@/app/utils/__mocks__/next-router'

import MetricsSearch from './MetricsSearch'

beforeEach(() => {
  mockRouter.push('/metrics-documentation')
  console.error = jest.fn()
})

test('renders input and buttons', async () => {
  const labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  const { getByRole } = render(<MetricsSearch value="" labels={labels} />)

  expect(getByRole('form', { name: 'Metrics search' })).toBeVisible()
  expect(getByRole('textbox', { name: 'Metric name' })).toBeVisible()
  expect(getByRole('link', { name: 'Clear' })).toBeVisible()
})

test('defaults the search input value with the value set in the url state', async () => {
  // set the url
  // render the component
  // assert that the input has the expected value
})

test('sets the url state with the search input when typing', async () => {
  mockRouter.push('')

  const labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  const { getByLabelText } = render(<MetricsSearch value="" labels={labels} />)

  await userEvent.type(getByLabelText('Metric name'), 'Mock search value')

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })
})

test('clears the url state and search input when clicking the "Clear" link', async () => {
  const labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  const { getByRole, getByLabelText } = render(<MetricsSearch value="" labels={labels} />)

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
  const labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  const { getByLabelText } = render(<MetricsSearch value="" labels={labels} />)

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
