import { render, screen } from '@testing-library/react'
import React from 'react'

import { useAreaSelector } from '@/app/hooks/useAreaSelector'

import { ChartRowCardHeader } from './ChartRowCardHeader'

jest.mock('@/app/hooks/useAreaSelector', () => ({
  useAreaSelector: jest.fn(),
}))

const useAreaSelectorMock = jest.mocked(useAreaSelector)

describe('ChartRowCardHeader', () => {
  test('renders correctly with props', async () => {
    useAreaSelectorMock.mockReturnValue([])
    render(await ChartRowCardHeader({ id: '1', title: 'Sample Title', description: 'Sample Description' }))
    expect(screen.getByRole('heading', { level: 3, name: 'Sample Title' })).toBeInTheDocument()
    expect(screen.getByText('Sample Description')).toBeInTheDocument()
  })

  test('displays a location when set', async () => {
    useAreaSelectorMock.mockReturnValue([null, 'Test Area'])
    render(await ChartRowCardHeader({ id: '1', title: 'Title', description: 'Description' }))
    expect(screen.getByRole('heading', { level: 3, name: 'Title (Test Area)' })).toBeInTheDocument()
  })

  test('renders children correctly', async () => {
    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
        description: 'Description',
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
        description: 'Description',
      })
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('govuk-body-m mb-2 text-dark-grey')
    expect(screen.getByText('Description')).toHaveClass('govuk-heading-s govuk-!-margin-bottom-2 pt-0')
  })
})
