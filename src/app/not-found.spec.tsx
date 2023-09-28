import { render } from '@/config/test-utils'

import NotFoundPage from './not-found'

test('Not found page renders correctly', async () => {
  const { getByText, getByRole } = render(await NotFoundPage())

  expect(getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
  expect(getByText('Please try again later.')).toBeInTheDocument()
  expect(
    getByText(
      'If you need to get in touch with UK Health Security Agency, you can find contact information at the bottom of the'
    )
  ).toBeInTheDocument()
  expect(getByRole('link', { name: 'UKHSA webpage' })).toHaveAttribute(
    'href',
    'https://www.gov.uk/government/organisations/uk-health-security-agency'
  )
  expect(getByRole('link', { name: 'Return to home page' })).toHaveAttribute('href', '/')
})
