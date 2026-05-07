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
    render(await ChartRowCardHeader({ id: '1', title: 'Sample Title', description: 'Sample Description' }))
    expect(screen.getByRole('heading', { level: 3, name: 'Sample Title' })).toBeInTheDocument()
    expect(screen.getByText('Sample Description')).toBeInTheDocument()
  })

  test('displays a location when set', async () => {
    getAreaSelectorMock.mockResolvedValue([null, 'Test Area'])
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
    expect(screen.getByText('Description')).toHaveClass(
      'govuk-body-s italic govuk-!-margin-bottom-2 pt-0 text-dark-grey'
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass('govuk-heading-m mb-2 font-bold')
  })

  test('renders data classification in heading when non-public', async () => {
    getAreaSelectorMock.mockResolvedValue([])

    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
        isNonPublic: true,
        dataClassification: 'official_sensitive',
      })
    )

    expect(screen.getByRole('heading', { level: 3, name: 'Title (OFFICIAL-SENSITIVE)' })).toBeInTheDocument()
  })

  test('render default data classification in heading when non-public and classification is omitted', async () => {
    getAreaSelectorMock.mockResolvedValue([])

    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
        isNonPublic: true,
      })
    )

    expect(screen.getByRole('heading', { level: 3, name: 'Title (OFFICIAL-SENSITIVE)' })).toBeInTheDocument()
  })

  test('does not render data classification in heading when public', async () => {
    getAreaSelectorMock.mockResolvedValue([])

    render(
      await ChartRowCardHeader({
        id: '1',
        title: 'Title',
        isNonPublic: false,
        dataClassification: 'official_sensitive',
      })
    )

    expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 }).textContent).not.toContain('OFFICIAL-SENSITIVE')
  })
})
