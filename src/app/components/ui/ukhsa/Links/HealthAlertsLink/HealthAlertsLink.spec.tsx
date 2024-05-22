import React from 'react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { render, screen } from '@/config/test-utils'

import HealthAlertsLink from './HealthAlertsLink'

mockRouter.push('/mock-age')

describe('HealthAlertsLink', () => {
  test('renders the link with correct styles', () => {
    render(<HealthAlertsLink type="heat" />)
    const link = screen.getByRole('link', { name: 'View map of weather health alerts' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('govuk-button govuk-button--secondary inline-flex gap-2 no-js:hidden')
  })

  test('renders the link with correct href for cold health alerts', () => {
    render(<HealthAlertsLink type="cold" />)
    const link = screen.getByRole('link', { name: 'View map of weather health alerts' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '?v=map&type=cold')
  })

  test('renders the link with correct href for heat health alerts', () => {
    render(<HealthAlertsLink type="heat" />)
    const link = screen.getByRole('link', { name: 'View map of weather health alerts' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '?v=map&type=heat')
  })

  test('renders the link with custom className', () => {
    render(<HealthAlertsLink type="heat" className="ukhsa-test-class" />)
    const link = screen.getByRole('link', { name: 'View map of weather health alerts' })
    expect(link).toHaveClass('ukhsa-test-class')
  })

  test('Shows a fallback message when there is an unrecoverable map error', () => {
    mockRouter.push('/mock-age?error=map')
    render(<HealthAlertsLink type="heat" className="ukhsa-test-class" />)
    expect(screen.getByText('There is a problem with the map. Please try again later.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'View map of weather health alerts' })).not.toBeInTheDocument()
  })
})
