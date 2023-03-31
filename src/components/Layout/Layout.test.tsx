import { render, screen } from '@testing-library/react'
import { Layout } from './Layout'

vi.mock('next/router', () => require('next-router-mock'))

/**
 * The Layout component is mostly rendered by the gov.uk library
 * These assertions cover the custom elements we're rendering alongside their components
 */
test('Displays the gov.uk header, phrase banner, navigation and footer', () => {
  render(<Layout />)

  // Header
  expect(screen.getByText('UKHSA Dashboard')).toHaveAttribute('href', '/')

  // Phrase Banner
  expect(screen.getByText('This is a new service – your feedback will help us to improve it.')).toBeInTheDocument()

  // Navigation
  expect(screen.getByRole('navigation', { name: 'Menu' })).toBeInTheDocument()

  // Footer
  const copyright = screen.getByText(/© Crown copyright/)
  expect(copyright).toHaveAttribute(
    'href',
    'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
  )
})

test('Displays page content within the layout', () => {
  render(
    <Layout>
      <h1>Burendo!</h1>
    </Layout>
  )

  expect(screen.getByRole('heading', { name: 'Burendo!' }))
})

test('Adds a class to the body so that we know if js is enabled', () => {
  render(<Layout />)
  expect(document.body.classList.contains('js-enabled')).toBeTruthy()
})
