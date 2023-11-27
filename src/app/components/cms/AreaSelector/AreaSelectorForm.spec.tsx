import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import React from 'react'

import { mockRouter } from '@/app/utils/__mocks__/next-router'

import { AreaSelectorForm } from './AreaSelectorForm'

mockRouter.push('/topics/mock-topic')

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

  test('submits form and updates the url parameters', async () => {
    mockRouter.push('/topics/mock-topic')
    mockRouter.push = jest.fn()

    render(<AreaSelectorForm areaTypeOptions={areaTypeOptions} areaNameOptions={areaNameOptions} labels={labels} />)

    expect(mockRouter.asPath).toBe('/topics/mock-topic')

    await userEvent.selectOptions(screen.getByLabelText(labels.areaType), ['Nation'])
    await userEvent.selectOptions(screen.getByLabelText(labels.areaName), ['England'])
    await userEvent.click(screen.getByRole('button', { name: labels.updateBtn }))

    expect(mockRouter.push).toHaveBeenCalledWith('/topics/mock-topic?areaType=Nation&areaName=England', {
      scroll: false,
    })
  })
})
