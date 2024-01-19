import { render } from '@testing-library/react'
import React from 'react'

import { UKHSA_GDPR_COOKIE_ACCEPT_VALUE, UKHSA_GDPR_COOKIE_NAME } from '@/app/constants/cookies.constants'

import { GoogleTagManager } from './GoogleTagManager'

jest.mock('next/headers', () => ({
  cookies: () => ({
    has: () => true,
    get: () => ({ name: UKHSA_GDPR_COOKIE_NAME, value: UKHSA_GDPR_COOKIE_ACCEPT_VALUE }),
  }),
}))

jest.mock('@/app/utils/app.utils')

// TODO: Fix once consent script issue is resolved

test.skip('renders Google Tag Manager script when a GTM ID is provided', () => {
  render(<GoogleTagManager />)

  const scriptElements = document.querySelectorAll('script')

  expect(scriptElements[0]).toHaveAttribute('src', 'https://www.googletagmanager.com/gtm.js?id=GTM-123')
  expect(scriptElements[1]).toHaveAttribute('id', 'google-tag-manager')
})

test.skip('renders Google Tag Manager with consent script when GDPR cookies are set', () => {
  render(<GoogleTagManager />)

  const scriptElements = document.querySelectorAll('script')

  expect(scriptElements).toHaveLength(3)
  expect(scriptElements[0]).toHaveAttribute('src', 'https://www.googletagmanager.com/gtm.js?id=GTM-123')
  expect(scriptElements[1]).toHaveAttribute('id', 'google-tag-manager')
  expect(scriptElements[2]).toHaveAttribute('id', 'google-tag-manager-with-consent')
})
