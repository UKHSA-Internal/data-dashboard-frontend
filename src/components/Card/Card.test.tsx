import { render, screen } from '@testing-library/react'
import { Card, CardColumn } from './Card'

test('Card displays content', () => {
  render(<Card theme="primary">My content</Card>)
  expect(screen.getByText('My content')).toBeInTheDocument()
})

test('Card Column displays a heading and content', () => {
  render(<CardColumn heading="Column Heading">Column content</CardColumn>)
  expect(screen.getByRole('heading', { name: 'Column Heading', level: 3 })).toBeInTheDocument()
  expect(screen.getByText('Column content')).toBeInTheDocument()
})

test('Card Column can show additional content adjacent to the heading', () => {
  render(
    <CardColumn heading="Column Heading" sideContent={<button>Click me</button>}>
      Column content
    </CardColumn>
  )
  expect(screen.getByRole('heading', { name: 'Column Heading', level: 3 })).toBeInTheDocument()
  expect(screen.getByText('Column content')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
})
