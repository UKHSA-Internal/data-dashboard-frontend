import React from 'react'

import { render, screen } from '@/config/test-utils'

import { Footer } from './Footer'

test('footer renders correctly', () => {
  render(<Footer />)
  const footerElement = screen.getByRole('contentinfo')
  expect(footerElement).toBeInTheDocument()
})

test('footer contains support links', () => {
  const { getByText } = render(<Footer />)
  expect(getByText('Cookies')).toHaveAttribute('href', '/cookie-policy')
})

test('footer contains Open Government Licence link', () => {
  const { getByText } = render(<Footer />)
  const licenceLink = getByText('Open Government Licence v3.0')
  expect(licenceLink).toBeInTheDocument()
  expect(licenceLink).toHaveAttribute(
    'href',
    'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'
  )
})

test('footer contains Crown copyright link', () => {
  const { getByText } = render(<Footer />)
  const crownCopyrightLink = getByText('© Crown copyright')
  expect(crownCopyrightLink).toBeInTheDocument()
  expect(crownCopyrightLink).toHaveAttribute(
    'href',
    'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
  )
})
