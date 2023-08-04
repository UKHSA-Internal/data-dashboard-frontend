import { render, within } from '@/config/test-utils'

import { View } from './View'

/**
 * Jest does not support RSC yet so we must await the component as a function
 */

test('renders the heading correctly', async () => {
  const heading = 'Test Heading'
  const { getByText } = render(await View({ heading, children: null }))
  const headingElement = getByText(heading)
  expect(headingElement).toBeInTheDocument()
})

test('renders the lastUpdated text if provided', async () => {
  const lastUpdated = '2023-03-21T10:25:34.452098Z'
  const { getByText } = render(await View({ heading: 'Test Heading', children: null, lastUpdated }))
  const lastUpdatedElement = getByText('Last updated on Tuesday, 21 March 2023 at 10:25am')
  expect(lastUpdatedElement).toBeInTheDocument()
})

test('renders the showWelcome text if provided', async () => {
  const { getByText } = render(await View({ heading: 'Test Heading', children: null, showWelcome: true }))
  const welcomeElement = getByText('Welcome')
  expect(welcomeElement).toBeInTheDocument()
})

test('renders the description correctly', async () => {
  const description = '<p>This is a test description.</p>'
  const { getByText } = render(await View({ heading: 'Test Heading', children: null, description }))
  const descriptionElement = getByText('This is a test description.')
  expect(descriptionElement).toBeInTheDocument()
})

test('renders the children correctly', async () => {
  const children = <div>Test Children</div>
  const { getByText } = render(await View({ heading: 'Test Heading', children }))
  const childrenElement = getByText('Test Children')
  expect(childrenElement).toBeInTheDocument()
})

test('renders the side navigation', async () => {
  process.env.PUBLIC_API_URL = '/public-api'

  const { getByRole } = render(await View({ heading: 'Test Heading', children: null }))

  const nav = getByRole('navigation')
  expect(nav).toBeInTheDocument()

  expect(within(nav).getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/')
  expect(within(nav).getByRole('link', { name: 'COVID-19' })).toHaveAttribute('href', '/topics/covid-19')
  expect(within(nav).getByRole('link', { name: 'Influenza' })).toHaveAttribute('href', '/topics/influenza')
  expect(within(nav).getByRole('link', { name: 'Other respiratory viruses' })).toHaveAttribute(
    'href',
    '/topics/other-respiratory-viruses'
  )
  expect(within(nav).getByRole('link', { name: 'API' })).toHaveAttribute('href', '/public-api/api/public/timeseries')
  expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  expect(within(nav).getByRole('link', { name: "What's new" })).toHaveAttribute('href', '/whats-new')
})

test('renders without a heading', async () => {
  const view = render(await View({ children: null })).queryByRole('heading', { level: 1 })
  expect(view).toBeNull()
})
