import { render, screen } from '@/config/test-utils'
import { Page } from './Page'

test('Page displays a heading, last updated date and content', () => {
  render(
    <Page heading="Page heading" lastUpdated="2023-03-21T10:25:34.452098Z">
      Content
    </Page>
  )
  expect(screen.getByRole('heading', { name: 'Page heading', level: 1 })).toBeInTheDocument()
  expect(screen.getByText('Last updated on Tuesday, 21 March 2023 at 10:25am')).toBeInTheDocument()
  expect(screen.getByText('Content')).toBeInTheDocument()
})
