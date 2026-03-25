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
      description: 'Optional description for the weather health alerts card.',
      alert_type: 'heat',
      source: {
        link_display_text: 'See detailed data',
        page: 'https://localhost/weather-health-alerts/',
        external_url: '',
      },
    }

    render(<WeatherHealthAlertCard value={mockValue} />)

    // Basic test to ensure component renders without crashing
    expect(screen.getByText('Heat health alerts')).toBeInTheDocument()
    expect(screen.getByText('Optional description for the weather health alerts card.')).toBeInTheDocument()
    expect(screen.getByText('Source:')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'See detailed data' })).toBeInTheDocument()
  })

  test('renders with different alert types', () => {
    const mockValue = {
      title: 'Cold health alerts',
      sub_title: 'Across England',
      alert_type: 'cold',
      source: {
        link_display_text: 'External source',
        page: null,
        external_url: 'https://example.org',
      },
    }

    render(<WeatherHealthAlertCard value={mockValue} />)

    expect(screen.getByText('Cold health alerts')).toBeInTheDocument()
    expect(screen.getByText('Source:')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'External source' })).toHaveAttribute('href', 'https://example.org')
    expect(screen.getByTestId('weather-health-alert-source')).toHaveClass('mt-auto')
  })
})
