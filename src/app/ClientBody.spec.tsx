import React from 'react'

import { render } from '@/config/test-utils'

import { ClientBody } from './ClientBody'

describe('ClientBody', () => {
  beforeEach(() => {
    document.body.className = ''
  })

  it('adds classes to body on mount', () => {
    render(<ClientBody>Test</ClientBody>)
    expect(document.body.classList.contains('js-enabled')).toBe(true)
    expect(document.body.classList.contains('govuk-frontend-supported')).toBe(true)
  })

  it('removes classes from body on unmount', () => {
    const { unmount } = render(<ClientBody>Test</ClientBody>)
    unmount()
    expect(document.body.classList.contains('js-enabled')).toBe(false)
    expect(document.body.classList.contains('govuk-frontend-supported')).toBe(false)
  })
})
