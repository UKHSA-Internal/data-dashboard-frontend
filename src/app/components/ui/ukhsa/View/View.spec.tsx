import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { View } from './View'

jest.mock('react-plotly.js', () => ({
  default: () => <div data-testid="mock-plotly-chart">Mocked Plotly Chart</div>,
}))

Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: jest.fn(() => 'mock-object-url'),
    revokeObjectURL: jest.fn(),
  },
  writable: true,
})

jest.mocked(client).mockResolvedValue({
  data: allPagesMock,
  status: 200,
})

/**
 * Jest does not support RSC yet so we must await the component as a function
 */

test('renders the heading correctly', async () => {
  const heading = 'Test Heading'
  const { getByRole } = render(await View({ heading, children: null }))
  const headingElement = getByRole('heading', { level: 1, name: heading })
  expect(headingElement).toBeInTheDocument()
})

test('renders the lastUpdated text if provided', async () => {
  const lastUpdated = '2023-03-21T10:25:34.452098Z'
  const { getByText, getByRole } = render(await View({ heading: 'Test Heading', children: null, lastUpdated }))
  expect(getByRole('heading', { level: 1, name: 'Test Heading' })).toHaveClass('govuk-!-margin-bottom-2')

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

test('renders without a heading', async () => {
  const view = render(await View({ children: null })).queryByRole('heading', { level: 1 })
  expect(view).toBeNull()
})

test('renders the govuk headings', async () => {
  const children = '<h2>heading 2</h2><h3>heading 3</h3><h4>heading 4</h4>'

  const { getByRole } = render(await View({ heading: 'Test', description: children, children: null }))

  expect(getByRole('heading', { level: 2, name: 'heading 2' })).toHaveClass('govuk-heading-l')
  expect(getByRole('heading', { level: 3, name: 'heading 3' })).toHaveClass('govuk-heading-m')
  expect(getByRole('heading', { level: 4, name: 'heading 4' })).toHaveClass('govuk-heading-s')
})

test('renders the back button', async () => {
  const { getByRole } = render(await View({ heading: 'Test Heading', children: null, backLink: 'whats-new' }))

  expect(getByRole('link', { name: 'Back' })).toHaveAttribute('href', 'whats-new')
})

test('renders breadcrumbs', async () => {
  const { getByRole } = render(
    await View({
      heading: 'Test',
      children: null,
      breadcrumbs: [
        { name: 'Home', link: '/home' },
        { name: 'Breadcrumb test', link: '/breadbrumb-test' },
      ],
    })
  )

  expect(getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home')
  expect(getByRole('link', { name: 'Breadcrumb test' })).toHaveAttribute('href', '/breadbrumb-test')
})
