import { render, screen } from '@testing-library/react'
import { Page } from './Page'

test('Page displays a heading and content', () => {
  render(<Page heading="Page heading">Content</Page>)
  expect(
    screen.getByRole('heading', { name: 'Page heading', level: 1 })
  ).toBeInTheDocument()
  expect(screen.getByText('Content')).toBeInTheDocument()
})
