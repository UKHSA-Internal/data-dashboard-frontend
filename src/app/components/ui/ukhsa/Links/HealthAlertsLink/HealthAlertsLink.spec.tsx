import React from 'react'

import { render, screen } from '@/config/test-utils'

import HealthAlertsLink from './HealthAlertsLink'

describe('HealthAlertsLink', () => {
  test('renders the link with correct styles', () => {
    render(<HealthAlertsLink />)
    const link = screen.getByRole('link', { name: 'View map of weather health alerts' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('govuk-button govuk-button--secondary inline-flex gap-2 no-js:hidden')
  })

  test('renders the link with correct href', () => {
    render(<HealthAlertsLink />)
    const link = screen.getByRole('link', { name: 'View map of weather health alerts' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '?v=map')
  })
})
