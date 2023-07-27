import { render, screen } from '@/config/test-utils'

import Browse from './page'

test('Displays browse page content', () => {
  render(<Browse />)

  expect(screen.getByRole('navigation', { name: 'Block Menu' })).toBeInTheDocument()

  const dashboard = screen.getByRole('link', { name: 'Dashboard' })
  expect(dashboard).toBeInTheDocument()
  expect(dashboard).toHaveAttribute('href', '/')

  const covid = screen.getByRole('link', { name: 'COVID-19' })
  expect(covid).toBeInTheDocument()
  expect(covid).toHaveAttribute('href', '/topics/coronavirus')

  const influenza = screen.getByRole('link', { name: 'Influenza' })
  expect(influenza).toBeInTheDocument()
  expect(influenza).toHaveAttribute('href', '/topics/influenza')

  const other = screen.getByRole('link', { name: 'Other respiratory viruses' })
  expect(other).toBeInTheDocument()
  expect(other).toHaveAttribute('href', '/topics/other-respiratory-viruses')

  const api = screen.getByRole('link', { name: 'API' })
  expect(api).toBeInTheDocument()
  expect(api).toHaveAttribute('href', `${process.env.PUBLIC_API_URL}/api/public/timeseries`)

  const about = screen.getByRole('link', { name: 'About' })
  expect(about).toBeInTheDocument()
  expect(about).toHaveAttribute('href', '/about')

  const whatsnew = screen.getByRole('link', { name: "What's new" })
  expect(whatsnew).toBeInTheDocument()
  expect(whatsnew).toHaveAttribute('href', '/whats-new')
})
