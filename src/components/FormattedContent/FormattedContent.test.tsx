import { render, screen } from '@testing-library/react'
import { FormattedContent } from './FormattedContent'

jest.mock('next/router', () => require('next-router-mock'))

const mockData =
  '<h1>Primary test</h1><h2>Secondary test</h2><h3>Tertiary test</h3><a href="/test">Link test</a><ul><li>List item test</li></ul>'

test('Marks down content, and swaps standard HTML components to Gov UK components', () => {
  render(<FormattedContent>{mockData}</FormattedContent>)

  expect(screen.getByRole('heading', { name: 'Primary test', level: 1 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Secondary test', level: 2 })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Tertiary test', level: 3 })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Link test' })).toHaveAttribute('href', '/test')
  expect(screen.getAllByRole('listitem')).toHaveLength(1)
})
