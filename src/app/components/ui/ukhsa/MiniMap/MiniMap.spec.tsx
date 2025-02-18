import userEvent from '@testing-library/user-event'
import React from 'react'
import { useDebounceValue } from 'usehooks-ts'

import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { render, screen } from '@/config/test-utils'

import { MiniMap } from './MiniMap'

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
    return {
      t: (stringKey: string, parameters: { level: string }) => translationFunction(stringKey, parameters),
      i18n: {
        language: 'en',
        addResourceBundle: () => jest.fn(),
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

jest.mock('usehooks-ts', () => ({
  useDebounceValue: jest.fn(),
}))

const translationFunction = (stringKey: string, options: { level: string }) => {
  if (stringKey === 'map.no-alert') {
    return 'No alert'
  } else {
    return `${options.level} alert`
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

const mockGreenAlertData = {
  data: [
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
  const regionId = jest.fn()
  const mockPush = jest.fn()

  const mockHandleClick = jest.fn()
  const mockHandleMouseLeave = jest.fn()
  const mockHandleMouseEnter = jest.fn()
  const mockUseWeatherHealthAlertList = useWeatherHealthAlertList as jest.Mock
  const mockUseDebounceValue = useDebounceValue as jest.Mock

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
    mockUseWeatherHealthAlertList.mockReturnValueOnce(() => {})
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation(regionId, [])

    const { container } = render(<MiniMap alertType="cold" />)

    expect(container).toBeEmptyDOMElement()
  })

  test('returns null when alerts data isLoading is True', async () => {
    const mockAlertData = { isLoading: true }
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockReturnValueOnce(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation(regionId, [])

    const { container } = render(<MiniMap alertType="cold" />)

    expect(container).toBeEmptyDOMElement()
  })

  test('renders minimap regional key with provided alert Data ', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation(regionId, [])

    const { getByLabelText, getByText } = render(<MiniMap alertType="cold" />)

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
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation(regionId, [])

    const { getByText } = render(<MiniMap alertType="cold" />)

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
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation((fn: jest.Mock<void, void[], void>) => {
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

    const page = render(<MiniMap alertType="cold" />)
    await userEvent.click(page.getByText('North West'))
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/?v=map&type=cold&fid=E12000002'), { scroll: false })

    expect(mockPush).toHaveBeenCalledTimes(1)
  })

  test('renders the minimap svg next to the minimap regional key', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation(regionId, [])

    const { getByLabelText } = render(<MiniMap alertType="cold" />)

    expect(getByLabelText('Map of weather health alerts')).toBeVisible()
  })

  test(' when the minimap is rendered, a user can select region and navigate to full map page with region selected', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation((fn: jest.Mock<void, void[], void>) => {
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

    const page = render(<MiniMap alertType="cold" />)
    await userEvent.hover(page.getByRole('listitem', { name: 'North West: Amber alert' }))
    expect(mockUseDebounceValue).toHaveBeenCalledTimes(1)
  })

  test(' when the minimap is rendered, a user can select region and navigate to full map page with region selected', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation((fn: jest.Mock<void, void[], void>) => {
      if (fn === mockHandleClick) {
        return mockHandleClick
      }
      if (fn === mockHandleMouseLeave) {
        return mockHandleMouseLeave
      }
      return fn
    })

    const page = render(<MiniMap alertType="cold" />)

    await userEvent.click(page.getByTestId('feature-E12000002'))
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/?v=map&type=cold&fid=E12000002'), { scroll: false })
    expect(mockPush).toHaveBeenCalledTimes(1)
  })

  test('renders the "Enter Fullscreen" button', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation(regionId, [])

    const { getByRole } = render(<MiniMap alertType="cold" />)

    expect(getByRole('button', { name: 'Enter Fullscreen' })).toBeVisible()
  })

  test('When the "Enter Fullscreen" button is clicked it should navigate to the full map screen', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation((fn: jest.Mock<void, void[], void>) => {
      if (fn === mockHandleClick) {
        return mockHandleClick
      }
      if (fn === mockHandleMouseLeave) {
        return mockHandleMouseLeave
      }
      return fn
    })

    const page = render(<MiniMap alertType="cold" />)

    await userEvent.click(page.getByRole('button', { name: 'Enter Fullscreen' }))
    expect(useCallbackMock).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/?v=map&type=cold'), { scroll: false })
    expect(mockPush).toHaveBeenCalledTimes(1)
  })

  test('All green - returns just green status', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockGreenAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation(regionId, [])

    const { getByText } = render(<MiniMap alertType="cold" />)

    expect(getByText('No alert')).toBeVisible()
    //query for green alert data
    const london = screen.getByText('London')
    const southEast = screen.getByText('South East')
    const southWest = screen.getByText('South West')
    const eastOfEngland = screen.getByText('East of England')
    const westMidlands = screen.getByText('West Midlands')

    //other status colours
    const northEastAlert = screen.queryByLabelText('North East: Red alert')
    const northWestAlert = screen.queryByLabelText('North West: Amber alert')
    const yorkshireAndTheHumberAlert = screen.queryByLabelText('Yorkshire and The Humber: Yellow alert')
    const eastMidlandsAlert = screen.queryByLabelText('East Midlands: Yellow alert')

    expect(london).toBeVisible()
    expect(southEast).toBeVisible()
    expect(southWest).toBeVisible()
    expect(eastOfEngland).toBeVisible()
    expect(westMidlands).toBeVisible()

    expect(northEastAlert).not.toBeInTheDocument()
    expect(northWestAlert).not.toBeInTheDocument()
    expect(yorkshireAndTheHumberAlert).not.toBeInTheDocument()
    expect(eastMidlandsAlert).not.toBeInTheDocument()

    expect(getByText('West Midlands')).toBeVisible()
  })

  test('test links to pages for all green status in lists and maps for all regions', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockGreenAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation((fn: jest.Mock<void, void[], void>) => {
      if (fn === mockHandleClick) {
        return mockHandleClick
      }
      if (fn === mockHandleMouseLeave) {
        return mockHandleMouseLeave
      }
      return fn
    })

    render(<MiniMap alertType="cold" />)

    // Loop through each region in mockGreenAlertData and ensure links to pages in list
    for (const alert of mockGreenAlertData.data) {
      const regionName = alert.geography_name
      const expectedUrl = `/?v=map&type=cold&fid=${alert.geography_code}`

      const alertItem = screen.getByRole('listitem', { name: `${regionName}: Green alert` })

      await userEvent.click(alertItem)
      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining(expectedUrl), { scroll: false })
      expect(mockPush).toHaveBeenCalledTimes(1)
      jest.clearAllMocks()
    }

    // Loop through each region in mockGreenAlertData and ensure links to pages in map

    for (const alert of mockGreenAlertData.data) {
      const expectedUrl = `/?v=map&type=cold&fid=${alert.geography_code}`

      const map = screen.getByRole('application', { name: 'Map of weather health alerts' })
      expect(map).toBeVisible()

      await userEvent.click(screen.getByTestId(`feature-${alert.geography_code}`))
      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining(expectedUrl), { scroll: false })
      expect(mockPush).toHaveBeenCalledTimes(1)
      jest.clearAllMocks()
    }
  })

  test('R, A, Y, G - shows all statuses, and just those regions within; Has links to pages both', async () => {
    useStateMock.mockImplementationOnce(() => [null, setMockState])
    mockUseWeatherHealthAlertList.mockImplementation(() => mockAlertData)
    mockUseDebounceValue.mockImplementation(() => [])
    useCallbackMock.mockImplementation((fn: jest.Mock) => {
      if (fn === mockHandleClick) {
        return mockHandleClick
      }
      if (fn === mockHandleMouseLeave) {
        return mockHandleMouseLeave
      }
      return fn
    })

    const { getByText } = render(<MiniMap alertType="cold" />)

    expect(getByText('North East')).toBeVisible()
    expect(getByText('Red alert')).toBeVisible()

    expect(getByText('North West')).toBeVisible()
    expect(getByText('Amber alert')).toBeVisible()

    expect(getByText('Yorkshire and The Humber')).toBeVisible()
    expect(getByText('Yellow alert')).toBeVisible()

    expect(getByText('West Midlands')).toBeVisible()
    expect(getByText('No alert')).toBeVisible()
  })
})
