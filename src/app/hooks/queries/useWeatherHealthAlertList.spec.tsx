import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement, ReactNode } from 'react'
import { ZodError } from 'zod'

import { getHealthAlerts } from '@/api/requests/health-alerts/getHealthAlerts'
import useWeatherHealthAlertList from '@/app/hooks/queries/useWeatherHealthAlertList'
import { toSlug } from '@/app/utils/app.utils'
import { renderHook, waitFor } from '@/config/test-utils'
import { fixtures } from '@/mock-server/handlers/alerts/v1/fixtures/list'

jest.mock('@/api/requests/health-alerts/getHealthAlerts', () => ({
  getHealthAlerts: jest.fn(),
}))

interface ChildrenType {
  children: ReactNode | ReactElement
}

const mockGetHealthAlerts = getHealthAlerts as jest.MockedFunction<typeof getHealthAlerts>

const queryClient = new QueryClient()
const wrapper = ({ children }: ChildrenType) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useWeatherHealthAlertList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('handles success response correctly', async () => {
    const fixture = fixtures.Green
    const processedFixtures = fixture.map((object) => ({
      ...object,
      slug: toSlug(object.geography_name),
    }))
    mockGetHealthAlerts.mockResolvedValueOnce({
      success: true,
      data: fixture,
    })

    const { result } = renderHook(() => useWeatherHealthAlertList({ type: 'cold' }), { wrapper })

    await waitFor(() => expect(result.current.data).toEqual(processedFixtures))
  })

  it('handles error response gracefully', async () => {
    mockGetHealthAlerts.mockResolvedValueOnce({
      success: false,
      error: new ZodError([]),
    })

    const { result } = renderHook(() => useWeatherHealthAlertList({ type: 'cold' }), { wrapper })

    await waitFor(() => expect(result.current.data).toBeUndefined)
  })
})
