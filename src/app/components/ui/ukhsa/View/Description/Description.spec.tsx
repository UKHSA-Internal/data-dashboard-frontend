import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { Description } from './Description'

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
test('renders the description correctly', async () => {
  const description = '<p>This is a test description.</p>'
  const { getByText } = render(await Description({ description }))
  const descriptionElement = getByText('This is a test description.')
  expect(descriptionElement).toBeInTheDocument()
})

test('renders the govuk headings', async () => {
  const children = '<h2>heading 2</h2><h3>heading 3</h3><h4>heading 4</h4>'

  const { getByRole } = render(await Description({ description: children }))

  expect(getByRole('heading', { level: 2, name: 'heading 2' })).toHaveClass('govuk-heading-l')
  expect(getByRole('heading', { level: 3, name: 'heading 3' })).toHaveClass('govuk-heading-m')
  expect(getByRole('heading', { level: 4, name: 'heading 4' })).toHaveClass('govuk-heading-s')
})
