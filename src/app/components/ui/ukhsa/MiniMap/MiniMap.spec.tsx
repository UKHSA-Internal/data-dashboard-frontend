import React, { useState as useStateMock, useCallback as useCallbackMock } from 'react'

import { render } from '@/config/test-utils'

import { MiniMap } from './MiniMap'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { useTranslation as useTranslationMock } from '@/app/i18n/client'
import { useDebounceValue as useDebounceValueMock } from 'usehooks-ts'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useCallback: jest.fn(),
}))

jest.mock('@/app/hooks/queries/useWeatherHealthAlertList', () => jest.fn())
jest.mock('@/app/i18n/client', () => ({
  ...jest.requireActual('@/app/i18n/client'),
  useTranslation: jest.fn(),
}))

jest.mock('usehooks-ts', () => ({
  ...jest.requireActual('usehooks-ts'),
  useDebounceValue: jest.fn(),
}))

describe('MiniMap', () => {
  const setMockState = jest.fn()
  const setCallbackState = jest.fn()
  const regionId = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns null when no alerts data is provided', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => false)
    useTranslationMock.mockImplementation(() => true)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation(regionId, [])

    const { getByText, container } = render(
      await MiniMap({
        alertType: 'heat',
      })
    )

    expect(container).toBeEmptyDOMElement()
  })

  test('returns null when alerts data isLoading is True', async () => {
    const mockAlertData = { isLoading: true }
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useTranslationMock.mockImplementation(() => true)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation(regionId, [])

    const { getByText, container } = render(
      await MiniMap({
        alertType: 'heat',
      })
    )

    expect(container).toBeEmptyDOMElement()
  })
})
