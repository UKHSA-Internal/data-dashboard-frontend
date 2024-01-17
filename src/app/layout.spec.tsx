import { render } from '@testing-library/react'

import RootLayout from './layout'

jest.mock('cookies-next', () => ({
  hasCookie: jest.fn(),
  getCookie: jest.fn(),
}))

jest.mock('@/app/utils/app.utils')
jest.mock('./components/ui/ukhsa/CookieBanner/CookieBanner')

console.error = jest.fn()

test('renders a noscript fallback for non-js users', async () => {
  render(await RootLayout({ children: null }))

  const scriptElements = document.querySelectorAll('noscript')
  expect(scriptElements).toHaveLength(1)
  expect(scriptElements[0].innerHTML).toContain('https://www.googletagmanager.com/ns.html?id=GTM-123')
})
