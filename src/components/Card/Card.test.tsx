import { render, screen } from '@testing-library/react'
import { Card, CardColumn } from './Card'

test('Card displays content', () => {
  render(<Card>My content</Card>)
  expect(screen.getByText('My content')).toBeInTheDocument()
})

test('Card Column displays a heading and content', () => {
  render(<CardColumn heading="Column Heading">Column content</CardColumn>)
  expect(
    screen.getByRole('heading', { name: 'Column Heading', level: 3 })
  ).toBeInTheDocument()
  expect(screen.getByText('Column content')).toBeInTheDocument()
})
