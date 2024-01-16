import { render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ComponentProps } from 'react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'

import MetricsSearch from './MetricsSearch'

type Labels = ComponentProps<typeof MetricsSearch>['labels']

beforeEach(() => {
  mockRouter.push('/metrics-documentation')
  console.error = jest.fn()
})

test('renders input and buttons', async () => {
  const labels: Labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  const { getByRole } = render(<MetricsSearch value="" labels={labels} />)

  const form = getByRole('form', { name: 'Metrics search' })
  expect(form).toBeVisible()
  expect(form).toHaveAttribute('method', 'GET')
  expect(form).toHaveAttribute('action', '/metrics-documentation')

  expect(getByRole('textbox', { name: 'Metric name' })).toBeVisible()
  expect(getByRole('link', { name: 'Clear' })).toBeVisible()
})

test('defaults the search input value with the value set in the url state', async () => {
  mockRouter.push('/?search=Mock+search+value')

  const labels: Labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  const { getByLabelText } = render(<MetricsSearch value="Mock search value" labels={labels} />)

  await waitFor(() => {
    expect(mockRouter.asPath).toEqual('/?search=Mock+search+value')
  })

  await waitFor(() => {
    expect(getByLabelText('Metric name')).toHaveValue('Mock search value')
  })
})

test('sets the url state with the search input when typing', async () => {
  mockRouter.push('')

  const labels: Labels = {
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
  const labels: Labels = {
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
  const labels: Labels = {
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
