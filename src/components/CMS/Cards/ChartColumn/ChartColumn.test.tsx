import { render, screen } from '@/config/test-utils'

import { ChartColumn } from './ChartColumn'

// The Govuk Paragraph component is using dependency with deprecated features
// that cause the unit tests to fail. This mock overrides the component
jest.mock('govuk-react', () => ({
  ...jest.requireActual('govuk-react'),
  Paragraph: ({ children }: { children: string }) => <p>{children}</p>,
}))

test('Displays the chart card', () => {
  render(
    <ChartColumn heading="Howdy" description="Nice chart!" chart={<div>mock chart image</div>}>
      Custom content inside
    </ChartColumn>
  )

  // Heading
  expect(screen.getByRole('heading', { name: 'Howdy', level: 3 })).toBeInTheDocument()

  // Description
  expect(screen.getByText('Nice chart!')).toBeInTheDocument()

  // Download link
  expect(screen.queryByRole('link', { name: 'Download' })).not.toBeInTheDocument()

  // Custom content
  expect(screen.getByText('Custom content inside')).toBeInTheDocument()

  // Chart
  expect(screen.getByText('mock chart image')).toBeInTheDocument()

  // Test id (for e2e selectors)
  expect(screen.getByTestId('column-howdy')).toBeInTheDocument()
})

test('Supports custom props (e.g. test attributes)', () => {
  render(
    <ChartColumn heading="Howdy" description="Nice chart!" chart={null} cardProps={{ 'data-testid': 'content' }} />
  )
  expect(screen.getByTestId('content')).toBeInTheDocument()
})

test('Supports showing a download button', () => {
  render(
    <ChartColumn
      heading="Howdy"
      description="Nice chart!"
      download={<button>Download</button>}
      chart={<div>mock chart image</div>}
    >
      Custom content inside
    </ChartColumn>
  )

  // Download button
  expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument()
})
