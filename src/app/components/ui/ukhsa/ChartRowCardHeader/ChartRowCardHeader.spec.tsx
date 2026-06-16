import React from 'react'

import { getAreaSelector } from '@/app/hooks/getAreaSelector'
import { render, screen } from '@/config/test-utils'

import { ChartRowCardHeader } from './ChartRowCardHeader'

jest.mock('@/app/hooks/getAreaSelector', () => ({
  getAreaSelector: jest.fn(),
}))

const getAreaSelectorMock = jest.mocked(getAreaSelector)

describe('ChartRowCardHeader', () => {
  test('renders correctly with props', async () => {
    getAreaSelectorMock.mockResolvedValue([])
    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Sample Title',
        description: 'Sample Description',
        pageClassification: 'official',
        authEnabled: false,
      })
    )
    expect(screen.getByRole('heading', { level: 3, name: 'Sample Title' })).toBeInTheDocument()
    expect(screen.getByText('Sample Description')).toBeInTheDocument()
  })

  test('displays a location when set', async () => {
    getAreaSelectorMock.mockResolvedValue([null, 'Test Area'])
    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
        description: 'Description',
        pageClassification: 'official',
        authEnabled: false,
      })
    )
    expect(screen.getByRole('heading', { level: 3, name: 'Title (Test Area)' })).toBeInTheDocument()
  })

  test('renders children correctly', async () => {
    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
        description: 'Description',
        pageClassification: 'official',
        authEnabled: false,
        children: <div>Child Element</div>,
      })
    )
    expect(screen.getByText('Child Element')).toBeInTheDocument()
  })

  test('applies correct classes to description and heading', async () => {
    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
        description: 'Description',
        pageClassification: 'official',
        authEnabled: false,
      })
    )
    expect(screen.getByText('Description')).toHaveClass(
      'govuk-body-s italic govuk-!-margin-bottom-2 pt-0 text-dark-grey'
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('govuk-heading-m mb-2 font-bold')
  })
})
