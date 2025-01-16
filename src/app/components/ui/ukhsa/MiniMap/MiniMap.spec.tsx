import React, { useState as useStateMock, useCallback as useCallbackMock } from 'react'

import { render } from '@/config/test-utils'

import { MiniMap } from './MiniMap'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { useTranslation as useTranslationMock } from '@/app/i18n/client'
import { useDebounceValue as useDebounceValueMock } from 'usehooks-ts'
import userEvent from '@testing-library/user-event'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useCallback: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/app/hooks/queries/useWeatherHealthAlertList', () => jest.fn())

jest.mock('@/app/i18n/client', () => ({
  ...jest.requireActual('@/app/i18n/client'),
  useTranslation: () => {
    const enFile = jest.requireActual('./mockData/weatherHealthAlerts.json')
    return {
      t: (stringKey: string, parameters) => translationFunction(stringKey, parameters),
      i18n: {
        language: 'en',
        addResourceBundle: () => jest.fn(),
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

jest.mock('usehooks-ts', () => ({
  ...jest.requireActual('usehooks-ts'),
  useDebounceValue: jest.fn(),
}))

const translationFunction = (x, y) => {
  if (x === 'map.no-alert') {
    return 'No alert'
  } else {
    return `${y.level} alert`
  }
}

const mockAlertData = {
  data: [
    {
      status: 'Red',
      geography_name: 'North East',
      geography_code: 'E12000001',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'north-east',
    },
    {
      status: 'Amber',
      geography_name: 'North West',
      geography_code: 'E12000002',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'north-west',
    },
    {
      status: 'Yellow',
      geography_name: 'Yorkshire and The Humber',
      geography_code: 'E12000003',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'yorkshire-and-the-humber',
    },
    {
      status: 'Yellow',
      geography_name: 'East Midlands',
      geography_code: 'E12000004',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'east-midlands',
    },
    {
      status: 'Green',
      geography_name: 'West Midlands',
      geography_code: 'E12000005',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'west-midlands',
    },
    {
      status: 'Green',
      geography_name: 'East of England',
      geography_code: 'E12000006',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'east-of-england',
    },
    {
      status: 'Green',
      geography_name: 'London',
      geography_code: 'E12000007',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'london',
    },
    {
      status: 'Green',
      geography_name: 'South East',
      geography_code: 'E12000008',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'south-east',
    },
    {
      status: 'Green',
      geography_name: 'South West',
      geography_code: 'E12000009',
      refresh_date: '2024-05-07 12:00:00',
      slug: 'south-west',
    },
  ],
}

describe('MiniMap', () => {
  const setMockState = jest.fn()
  const setCallbackState = jest.fn()
  const regionId = jest.fn()
  const mockTranslation = jest.fn((x, y) => translationFunction(x, y))
  const mockPush = jest.fn()

  const mockHandleClick = jest.fn()
  const mockHandleMouseLeave = jest.fn()
  const mockHandleMouseEnter = jest.fn()

  const useStateMock = jest.requireMock('react').useState
  const useCallbackMock = jest.requireMock('react').useCallback
  const useRouterMock = jest.requireMock('next/navigation').useRouter

  useRouterMock.mockReturnValue({
    push: mockPush,
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns null when no alerts data is provided', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => false)
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
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation(regionId, [])

    const { getByText, container } = render(
      await MiniMap({
        alertType: 'heat',
      })
    )

    expect(container).toBeEmptyDOMElement()
  })

  test('renders minimap regional key with provided alert Data ', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation(regionId, [])

    const { getByLabelText, getByText } = render(
      await MiniMap({
        alertType: 'cold',
      })
    )

    expect(getByLabelText('Weather health alerts by region')).toBeVisible()
    expect(getByText('Red alert')).toBeVisible()
    expect(getByText('Amber alert')).toBeVisible()
    expect(getByText('Yellow alert')).toBeVisible()
    expect(getByText('No alert')).toBeVisible()

    expect(getByText('Red alert')).toHaveAttribute('class', 'm-0 w-[100px] text-center capitalize bg-red text-white')
    expect(getByText('Amber alert')).toHaveAttribute(
      'class',
      'm-0 w-[100px] text-center capitalize bg-orange text-white'
    )
    expect(getByText('Yellow alert')).toHaveAttribute(
      'class',
      'm-0 w-[100px] text-center capitalize bg-custard text-black'
    )
    expect(getByText('No alert')).toHaveAttribute('class', 'm-0 w-[100px] text-center capitalize bg-green text-white')
  })

  test('renders minimap headers with correct classes and colours', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation(regionId, [])

    const { getByLabelText, getByText } = render(
      await MiniMap({
        alertType: 'cold',
      })
    )

    // Headers should be rendered with appropriate classes
    expect(getByText('Red alert')).toHaveAttribute('class', 'm-0 w-[100px] text-center capitalize bg-red text-white')
    expect(getByText('Amber alert')).toHaveAttribute(
      'class',
      'm-0 w-[100px] text-center capitalize bg-orange text-white'
    )
    expect(getByText('Yellow alert')).toHaveAttribute(
      'class',
      'm-0 w-[100px] text-center capitalize bg-custard text-black'
    )
    expect(getByText('No alert')).toHaveAttribute('class', 'm-0 w-[100px] text-center capitalize bg-green text-white')
  })

  test(' when the minimap region key is rendered, a user can select region and navigate to full map page with region selected', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation((fn) => {
      if (fn === mockHandleClick) {
        return mockHandleClick
      }
      if (fn === mockHandleMouseLeave) {
        return mockHandleMouseLeave
      }
      if (fn === mockHandleMouseEnter) {
        return mockHandleMouseLeave
      }
      return fn
    })

    const page = render(
      await MiniMap({
        alertType: 'cold',
      })
    )
    await userEvent.click(page.getByText('North West'))
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/?v=map&type=cold&fid=E12000002'), { scroll: false })

    expect(mockPush).toHaveBeenCalledTimes(1)
  })

  test('renders the minimap svg next to the minimap regional key', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation(regionId, [])

    const { getByLabelText, getByText } = render(
      await MiniMap({
        alertType: 'cold',
      })
    )

    expect(getByLabelText('Map of weather health alerts')).toBeVisible()
  })

  test(' when the minimap is rendered, a user can select region and navigate to full map page with region selected', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation((fn) => {
      if (fn === mockHandleClick) {
        return mockHandleClick
      }
      if (fn === mockHandleMouseLeave) {
        return mockHandleMouseLeave
      }
      if (fn === mockHandleMouseEnter) {
        return mockHandleMouseEnter
      }
      return fn
    })

    const page = render(
      await MiniMap({
        alertType: 'cold',
      })
    )
    await userEvent.hover(page.getByRole('listitem', { name: 'North West: Amber alert' }))
    expect(useDebounceValueMock).toHaveBeenCalledTimes(1)
  })

  test(' when the minimap is rendered, a user can select region and navigate to full map page with region selected', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation((fn) => {
      if (fn === mockHandleClick) {
        return mockHandleClick
      }
      if (fn === mockHandleMouseLeave) {
        return mockHandleMouseLeave
      }
      return fn
    })

    const page = render(
      await MiniMap({
        alertType: 'cold',
      })
    )
    await userEvent.click(page.getByTestId('feature-E12000002'))
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/?v=map&type=cold&fid=E12000002'), { scroll: false })
    expect(mockPush).toHaveBeenCalledTimes(1)
  })

  test('renders the "Enter Fullscreen" button', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation(regionId, [])

    const { getByRole } = render(
      await MiniMap({
        alertType: 'cold',
      })
    )

    expect(getByRole('button', { name: 'Enter Fullscreen' })).toBeVisible()
  })

  test('When the "Enter Fullscreen" button is clicked it should navigate to the full map screen', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    useWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    useDebounceValueMock.mockImplementation(() => 'string')
    useCallbackMock.mockImplementation((fn) => {
      if (fn === mockHandleClick) {
        return mockHandleClick
      }
      if (fn === mockHandleMouseLeave) {
        return mockHandleMouseLeave
      }
      return fn
    })

    const page = render(
      await MiniMap({
        alertType: 'cold',
      })
    )
    await userEvent.click(page.getByRole('button', { name: 'Enter Fullscreen' }))
    expect(useCallbackMock).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/?v=map&type=cold'), { scroll: false })
    expect(mockPush).toHaveBeenCalledTimes(1)
  })
})
