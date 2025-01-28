import React from 'react'

import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { render, screen } from '@/config/test-utils'

import { ChartRowCardHeader } from './ChartRowCardHeader'

jest.mock('@/app/hooks/getAreaSelector', () => ({
  getAreaSelector: jest.fn(),
}))

const getAreaSelectorMock = jest.mocked(getAreaSelector)

describe('ChartRowCardHeader', () => {
  test('displays a location when set', async () => {
    getAreaSelectorMock.mockReturnValue([null, 'Test Area'])
    render(await ChartRowCardHeader({ id: '1', title: 'Title' }))
    expect(screen.getByRole('heading', { level: 3, name: 'Title (Test Area)' })).toBeInTheDocument()
  })

  test('renders children correctly', async () => {
    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
        children: <div>Child Element</div>,
      })
    )
    expect(screen.getByText('Child Element')).toBeInTheDocument()
  })

  test('has correct structure and HTML elements', async () => {
    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
      })
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('font-bold default-govuk-header mb-2')
  })
})
