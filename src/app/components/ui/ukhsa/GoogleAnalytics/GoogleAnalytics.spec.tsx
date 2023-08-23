import { render } from '@testing-library/react'
import { getCookie } from 'cookies-next'
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { UKHSA_GDPR_COOKIE_ACCEPT_VALUE } from '@/app/constants/cookies.constants'
import { isProd } from '@/app/utils/app.utils'

import { GoogleAnalytics } from './GoogleAnalytics'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}))

// Mock the getCookie and setCookie functions
jest.mock('cookies-next', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
}))

const mockedGetCookie = jest.mocked(getCookie)

jest.mock('@/app/utils/app.utils')

beforeEach(() => {
  window.gtag = jest.fn()
})

const isProdMock = jest.mocked(isProd)
jest.mocked(usePathname).mockReturnValue('/mock-pathname')

const params = new URLSearchParams() as unknown as ReadonlyURLSearchParams
jest.mocked(useSearchParams).mockReturnValue(params)

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = ''
  mockedGetCookie.mockReturnValue('')
})

test('renders Google Analytics script when tracking ID is provided', () => {
  isProdMock.mockReturnValue(true)

  render(<GoogleAnalytics />)

  const scriptElements = document.querySelectorAll('script')

  expect(scriptElements).toHaveLength(2)
  expect(scriptElements[0]).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-123')
  expect(scriptElements[1]).toHaveAttribute('id', 'google-analytics')
})

test('renders Google Analytics script with consent script when GDPR cookies are set', () => {
  isProdMock.mockReturnValue(true)
  mockedGetCookie.mockReturnValue(UKHSA_GDPR_COOKIE_ACCEPT_VALUE)

  render(<GoogleAnalytics />)

  const scriptElements = document.querySelectorAll('script')
  expect(scriptElements).toHaveLength(1)
  expect(scriptElements[0]).toHaveAttribute('id', 'google-analytics-with-consent')
})

test('does not render Google Analytics script when not viewing the production site', () => {
  isProdMock.mockReturnValue(false)

  render(<GoogleAnalytics />)

  const scriptElements = document.querySelectorAll('script')

  expect(scriptElements).toHaveLength(0)
})

test('calls gtag to turn off auto page views and then to manually send a page view on page load', () => {
  isProdMock.mockReturnValue(true)

  render(<GoogleAnalytics />)

  expect(window.gtag).toHaveBeenCalledWith('config', 'G-123', {
    send_page_view: false,
  })

  expect(window.gtag).toHaveBeenCalledWith('event', 'page_view', {
    page_path: '/mock-pathname',
    send_to: 'G-123',
  })
})

test('turns off auto page views and manually sends a page view on page load for urls with search parameters', () => {
  isProdMock.mockReturnValue(true)

  const params = new URLSearchParams('param=value') as unknown as ReadonlyURLSearchParams
  jest.mocked(useSearchParams).mockReturnValue(params)

  render(<GoogleAnalytics />)

  expect(window.gtag).toHaveBeenCalledWith('config', 'G-123', {
    send_page_view: false,
  })

  expect(window.gtag).toHaveBeenCalledWith('event', 'page_view', {
    page_path: '/mock-pathname?param=value',
    send_to: 'G-123',
  })
})
