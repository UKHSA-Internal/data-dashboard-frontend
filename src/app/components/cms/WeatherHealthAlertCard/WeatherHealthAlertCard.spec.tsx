import { render, screen } from '@/config/test-utils'

jest.mock('@/app/hooks/queries/useWeatherHealthAlertList', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLoading: false,
    data: [
      {
        slug: 'london',
        status: 'Green',
        geography_name: 'London',
        geography_code: 'E12000007',
        refresh_date: null,
      },
    ],
  })),
}))

import { WeatherHealthAlertCard } from './WeatherHealthAlertCard'

describe('WeatherHealthAlertCard', () => {
  test('renders weather health alert card', () => {
    const mockValue = {
      title: 'Heat health alerts',
      sub_title: 'Across England',
      alert_type: 'heat',
    }

    render(<WeatherHealthAlertCard value={mockValue} />)

    // Basic test to ensure component renders without crashing
    expect(screen.getByText('Heat health alerts')).toBeInTheDocument()
  })

  test('renders with different alert types', () => {
    const mockValue = {
      title: 'Cold health alerts',
      sub_title: 'Across England',
      alert_type: 'cold',
    }

    render(<WeatherHealthAlertCard value={mockValue} />)

    expect(screen.getByText('Cold health alerts')).toBeInTheDocument()
  })
})
