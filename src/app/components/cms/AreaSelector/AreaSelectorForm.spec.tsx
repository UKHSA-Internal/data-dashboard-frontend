import userEvent from '@testing-library/user-event'
import React from 'react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'
import { act, render, screen } from '@/config/test-utils'

import { AreaSelectorForm } from './AreaSelectorForm'

describe('AreaSelectorForm', () => {
  const areaTypeOptions = ['Nation', 'UKHSA Region']
  const areaNameOptions = ['England', 'Scotland']

  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
  })

  test('renders with default values and labels', () => {
    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} areaType="Nation" />)

    // Form
    const form = screen.getByRole('form', { name: 'Area selector' })
    expect(form).toHaveAttribute('method', 'get')
    expect(form).toHaveAttribute('action', '/topics/mock-topic')

    // Area type select
    expect(screen.getByLabelText('Area type')).toHaveValue('')
    expect(screen.getByRole('option', { name: 'Select area type' })).toHaveAttribute('selected')

    // Area name select
    expect(screen.getByLabelText('Area name')).toHaveValue('')
    expect(screen.getByRole('option', { name: 'Select area name' })).toHaveAttribute('selected')

    // CTAs
    expect(screen.getByRole('button', { name: 'Update' })).toHaveAttribute('type', 'submit')
    expect(screen.getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/topics/mock-topic')
  })

  test('renders with pre-selected values persisted from the url', () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} areaType="Nation" />)

    // Form
    const form = screen.getByRole('form', { name: 'Area selector' })
    expect(form).toHaveAttribute('method', 'get')
    expect(form).toHaveAttribute('action', '/topics/mock-topic')

    // Area type select
    expect(screen.getByLabelText('Area type')).toHaveValue('Nation')
    expect(screen.getByRole('option', { name: 'Select area type' })).not.toHaveAttribute('selected')
    expect(screen.getByRole('option', { name: 'Nation' })).toHaveAttribute('selected')

    // Area name select
    expect(screen.getByLabelText('Area name')).toHaveValue('England')
    expect(screen.getByRole('option', { name: 'Select area name' })).not.toHaveAttribute('selected')
    expect(screen.getByRole('option', { name: 'England' })).toHaveAttribute('selected')

    // CTAs
    expect(screen.getByRole('button', { name: 'Update' })).toHaveAttribute('type', 'submit')
    expect(screen.getByRole('link', { name: 'Reset' })).toHaveAttribute('href', '/topics/mock-topic')
  })

  test('area name select is disabled or enabled depending on when an area type is selected', async () => {
    const { rerender } = render(
      <AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={[]} areaType="Nation" />
    )

    // Area type select
    expect(screen.getByLabelText('Area type')).toHaveValue('')
    expect(screen.getByRole('option', { name: 'Select area type' })).toHaveAttribute('selected')

    // Area name select
    expect(screen.getByLabelText('Area name')).toBeDisabled()

    await act(async () => {
      await mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')
    })

    rerender(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} areaType="Nation" />)

    expect(screen.getByLabelText('Area name')).toBeEnabled()
    expect(screen.getByRole('option', { name: 'Select area name' })).toHaveAttribute('selected')
  })

  test('area name select is reset whenever the area type value is changed', async () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    const originalPush = mockRouter.push
    mockRouter.push = jest.fn()

    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} areaType="Nation" />)

    expect(mockRouter.asPath).toEqual('/topics/mock-topic?areaType=Nation&areaName=England')
    expect(screen.getByLabelText('Area name')).toHaveValue('England')

    await userEvent.selectOptions(screen.getByLabelText('Area type'), ['UKHSA Region'])

    expect(screen.getByLabelText('Area name')).toHaveValue('')
    expect(mockRouter.push).toHaveBeenCalledWith('/topics/mock-topic?areaType=UKHSA+Region', {
      scroll: false,
    })

    mockRouter.push = originalPush
  })

  test('updating the area name select automatically updates the url search params', async () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation')

    const originalPush = mockRouter.push
    mockRouter.push = jest.fn()

    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} areaType="Nation" />)

    await userEvent.selectOptions(screen.getByLabelText('Area name'), ['England'])

    expect(mockRouter.push).toHaveBeenCalledWith('/topics/mock-topic?areaType=Nation&areaName=England', {
      scroll: false,
    })

    mockRouter.push = originalPush
  })

  test('clicking reset clears any selected values and then focuses the area type select', async () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} areaType="Nation" />)

    expect(screen.getByLabelText('Area name')).toHaveValue('England')
    expect(screen.getByLabelText('Area type')).toHaveValue('Nation')
    expect(screen.getByLabelText('Area type')).not.toHaveFocus()

    await userEvent.click(screen.getByRole('link', { name: 'Reset' }))

    expect(screen.getByLabelText('Area name')).toHaveValue('')
    expect(screen.getByLabelText('Area type')).toHaveValue('')
    expect(screen.getByLabelText('Area type')).toHaveFocus()
  })

  test('shows a submit button for non-javascript users', async () => {
    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} areaType="Nation" />)

    expect(mockRouter.asPath).toBe('/topics/mock-topic')
    expect(screen.getByRole('button', { name: 'Update' })).toHaveClass('hidden no-js:block')
  })
})
