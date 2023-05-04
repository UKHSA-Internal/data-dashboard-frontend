import { render, screen } from '@/config/test-utils'
import { Text } from './Text'

test('Displays content', () => {
  render(<Text>My content</Text>)
  expect(screen.getByText('My content')).toBeInTheDocument()
})

test('Parses HTML', () => {
  const html = '<a href="#">Link</a>'
  render(<Text>{html}</Text>)
  expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument()
})

test('Supports custom props (e.g. test attributes)', () => {
  render(<Text cardProps={{ 'data-testid': 'content' }}>My content</Text>)
  expect(screen.getByTestId('content')).toBeInTheDocument()
})
