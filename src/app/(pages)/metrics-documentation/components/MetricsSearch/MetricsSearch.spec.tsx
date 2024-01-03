import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockRouter } from '@/app/utils/__mocks__/next-router'

import MetricsSearch from './MetricsSearch'

test('renders input and buttons', async () => {
  mockRouter.push = jest.fn()

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

test('clears the url state when the value is cleared from the search input', async () => {
  mockRouter.push = jest.fn()

  const labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  const { getByDisplayValue, getByRole } = render(<MetricsSearch value="searchValue" labels={labels} />)

  expect(mockRouter.asPath).toEqual('metrics-documentation?search=searchValue')
  expect(getByDisplayValue('searchValue')).toBeInTheDocument()

  userEvent.click(getByRole('link', { name: 'Clear' }))
  expect(mockRouter.push).toHaveBeenCalledTimes(1)
  expect(mockRouter.asPath).toEqual('metrics-documentation?search=')
})

test('clears the url state when the value is changed', async () => {
  mockRouter.push = jest.fn()

  const labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  render(<MetricsSearch value="searchValue" labels={labels} />)

  expect(screen.getByDisplayValue('searchValue')).toBeInTheDocument()

  screen.getByRole('textbox', { name: 'Metric name' }).simulate('change')
})

test('sets URL state when value typed into the search bar', async () => {
  mockRouter.push = jest.fn()

  const labels = {
    searchTitle: 'Metric name',
    noScriptButtonText: 'Search',
    clearText: 'Clear',
  }

  render(<MetricsSearch value="searchValue" labels={labels} />)
})
