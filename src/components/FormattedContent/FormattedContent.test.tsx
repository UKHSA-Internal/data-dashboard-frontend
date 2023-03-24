import { render, screen, within } from '@testing-library/react'
import { FormattedContent } from './FormattedContent'

const mockData =
  '<h1>Primary test</h1><h2>Secondary test</h2><h3>Tertiary test</h3><a href="/test">Link test</a><ul><li>List item test</li></ul>'

test('Converts vanilla HTML into Gov UK React components', () => {
  render(<FormattedContent>{mockData}</FormattedContent>)

  expect(screen.getByRole('heading', { name: 'Primary test', level: 1 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Tertiary test', level: 3 })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Link test' })).toHaveAttribute('href', '/test')
  expect(screen.getAllByRole('listitem')).toHaveLength(1)
})

test('Renders a table of contents using the H2 elements within the provided HTML', () => {
  render(<FormattedContent hasLinkedHeadings>{mockData}</FormattedContent>)

  const nav = screen.getByRole('navigation')
  const listitems = within(nav).getAllByRole('listitem')

  expect(listitems).toHaveLength(1)
  expect(within(nav).getByRole('heading', { name: 'Contents', level: 2 }))
  expect(within(listitems[0]).getByText('Secondary test')).toHaveAttribute('href', '#secondary-test')
  expect(screen.getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
})
