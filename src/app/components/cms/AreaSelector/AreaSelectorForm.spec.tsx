import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'

import { AreaSelectorForm } from './AreaSelectorForm'

describe('AreaSelectorForm', () => {
  const areaTypeOptions = ['Nation', 'UKHSA Region']
  const areaNameOptions = ['England', 'Scotland']
  const labels = {
    areaType: 'Area type label',
    areaTypePlaceholder: 'Select area type',
    areaName: 'Area name label',
    areaNamePlaceholder: 'Select area name',
    updateBtn: 'Update Button',
    resetBtn: 'Reset Button',
  }

  beforeEach(() => {
    mockRouter.push('/topics/mock-topic')
    console.error = jest.fn()
  })

  test('renders with default values and labels', () => {
    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} labels={labels} />)

    // Form
    const form = screen.getByRole('form', { name: 'Area selector' })
    expect(form).toHaveAttribute('method', 'get')
    expect(form).toHaveAttribute('action', '/topics/mock-topic')

    // Area type select
    expect(screen.getByLabelText(labels.areaType)).toHaveValue('')
    expect(screen.getByRole('option', { name: labels.areaTypePlaceholder })).toHaveAttribute('selected')

    // Area name select
    expect(screen.getByLabelText(labels.areaName)).toHaveValue('')
    expect(screen.getByRole('option', { name: labels.areaNamePlaceholder })).toHaveAttribute('selected')

    // CTAs
    expect(screen.getByRole('button', { name: labels.updateBtn })).toHaveAttribute('type', 'submit')
    expect(screen.getByRole('link', { name: labels.resetBtn })).toHaveAttribute('href', '/topics/mock-topic')
  })

  test('renders with pre-selected values persisted from the url', () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} labels={labels} />)

    // Form
    const form = screen.getByRole('form', { name: 'Area selector' })
    expect(form).toHaveAttribute('method', 'get')
    expect(form).toHaveAttribute('action', '/topics/mock-topic')

    // Area type select
    expect(screen.getByLabelText(labels.areaType)).toHaveValue('Nation')
    expect(screen.getByRole('option', { name: labels.areaTypePlaceholder })).not.toHaveAttribute('selected')
    expect(screen.getByRole('option', { name: 'Nation' })).toHaveAttribute('selected')

    // Area name select
    expect(screen.getByLabelText(labels.areaName)).toHaveValue('England')
    expect(screen.getByRole('option', { name: labels.areaNamePlaceholder })).not.toHaveAttribute('selected')
    expect(screen.getByRole('option', { name: 'England' })).toHaveAttribute('selected')

    // CTAs
    expect(screen.getByRole('button', { name: labels.updateBtn })).toHaveAttribute('type', 'submit')
    expect(screen.getByRole('link', { name: labels.resetBtn })).toHaveAttribute('href', '/topics/mock-topic')
  })

  test('area name select is disabled or enabled depending on when an area type is selected', async () => {
    const { rerender } = render(
      <AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={[]} labels={labels} />
    )

    // Area type select
    expect(screen.getByLabelText(labels.areaType)).toHaveValue('')
    expect(screen.getByRole('option', { name: labels.areaTypePlaceholder })).toHaveAttribute('selected')

    // Area name select
    expect(screen.getByLabelText(labels.areaName)).toBeDisabled()

    await act(async () => {
      await mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')
    })

    rerender(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} labels={labels} />)

    expect(screen.getByLabelText(labels.areaName)).toBeEnabled()
    expect(screen.getByRole('option', { name: labels.areaNamePlaceholder })).toHaveAttribute('selected')
  })

  test('area name select is reset whenever the area type value is changed', async () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} labels={labels} />)

    expect(mockRouter.asPath).toEqual('/topics/mock-topic?areaType=Nation&areaName=England')
    expect(screen.getByLabelText(labels.areaName)).toHaveValue('England')

    await userEvent.selectOptions(screen.getByLabelText(labels.areaType), ['UKHSA Region'])

    expect(screen.getByLabelText(labels.areaName)).toHaveValue('')
  })

  test('clicking reset clears any selected values and then focuses the area type select', async () => {
    mockRouter.push('/topics/mock-topic?areaType=Nation&areaName=England')

    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} labels={labels} />)

    expect(screen.getByLabelText(labels.areaName)).toHaveValue('England')
    expect(screen.getByLabelText(labels.areaType)).toHaveValue('Nation')
    expect(screen.getByLabelText(labels.areaType)).not.toHaveFocus()

    await userEvent.click(screen.getByRole('link', { name: labels.resetBtn }))

    expect(screen.getByLabelText(labels.areaName)).toHaveValue('')
    expect(screen.getByLabelText(labels.areaType)).toHaveValue('')
    expect(screen.getByLabelText(labels.areaType)).toHaveFocus()
  })

  test('shows a submit button for non-javascript users', async () => {
    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} labels={labels} />)

    expect(mockRouter.asPath).toBe('/topics/mock-topic')
    expect(screen.getByRole('button', { name: labels.updateBtn })).toHaveClass('hidden no-js:block')
  })
})
