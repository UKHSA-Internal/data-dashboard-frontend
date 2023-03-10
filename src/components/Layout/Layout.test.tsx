import { render, screen, within } from '@testing-library/react'
import { Layout } from './Layout'

jest.mock('next/router', () => require('next-router-mock'))

/**
 * The Layout component is mostly rendered by the gov.uk library
 * These assertions cover the custom elements we're rendering alongside their components
 */
test('Displays the gov.uk header, phrase banner, navigation and footer', () => {
  render(<Layout />)

  // Header
  const header = screen.getByTestId('ukhsa-header')
  expect(within(header).getByText('UKHSA Dashboard')).toBeInTheDocument()

  // Phrase Banner
  const banner = screen.getByTestId('ukhsa-banner')
  expect(
    within(banner).getByText(
      'This is a new service – your feedback will help us to improve it.'
    )
  ).toBeInTheDocument()

  // Navigation
  expect(screen.getByRole('navigation', { name: 'Menu' })).toBeInTheDocument()

  // Footer
  const footer = screen.getByTestId('ukhsa-footer')
  const copyright = within(footer).getByText(/© Crown copyright/)
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
