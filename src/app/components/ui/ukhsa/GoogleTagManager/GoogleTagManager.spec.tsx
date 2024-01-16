import { render } from '@testing-library/react'
import { getCookie } from 'cookies-next'
import React from 'react'

import { UKHSA_GDPR_COOKIE_ACCEPT_VALUE } from '@/app/constants/cookies.constants'

import { GoogleTagManager } from './GoogleTagManager'

jest.mock('cookies-next', () => ({
  getCookie: jest.fn(),
}))

const mockedGetCookie = jest.mocked(getCookie)

jest.mock('@/app/utils/app.utils')

afterEach(() => {
  mockedGetCookie.mockReturnValue('')
})

test('renders Google Tag Manager script when a GTM ID is provided', () => {
  render(<GoogleTagManager />)

  const scriptElements = document.querySelectorAll('script')

  expect(scriptElements).toHaveLength(2)
  expect(scriptElements[0]).toHaveAttribute('src', 'https://www.googletagmanager.com/gtm.js?id=GTM-123')
  expect(scriptElements[1]).toHaveAttribute('id', 'google-tag-manager')
})

test('renders Google Tag Manager with consent script when GDPR cookies are set', () => {
  mockedGetCookie.mockReturnValue(UKHSA_GDPR_COOKIE_ACCEPT_VALUE)

  render(<GoogleTagManager />)

  const scriptElements = document.querySelectorAll('script')

  expect(scriptElements).toHaveLength(3)
  expect(scriptElements[0]).toHaveAttribute('src', 'https://www.googletagmanager.com/gtm.js?id=GTM-123')
  expect(scriptElements[1]).toHaveAttribute('id', 'google-tag-manager')
  expect(scriptElements[2]).toHaveAttribute('id', 'google-tag-manager-with-consent')
})

test('renders a noscript fallback for non-js users', () => {
  render(<GoogleTagManager />)

  const scriptElements = document.querySelectorAll('noscript')
  expect(scriptElements).toHaveLength(1)
  expect(scriptElements[0].innerHTML).toContain('https://www.googletagmanager.com/ns.html?id=GTM-123')
})
