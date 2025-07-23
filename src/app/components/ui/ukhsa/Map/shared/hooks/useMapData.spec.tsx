import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactElement, ReactNode } from 'react'
import { ZodError } from 'zod'

import { postMapData } from '@/api/requests/cover-maps/postMaps'
import useMapData from '@/app/components/ui/ukhsa/Map/shared/hooks/useMapData'
import { renderHook, waitFor } from '@/config/test-utils'

jest.mock('@/api/requests/cover-maps/postMaps', () => ({
  postMapData: jest.fn(),
}))

interface ChildrenType {
  children: ReactNode | ReactElement
}

const mockPostMapData = postMapData as jest.MockedFunction<typeof postMapData>

const queryClient = new QueryClient()

const wrapper = ({ children }: ChildrenType) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const request = {
  date_from: '2023-10-30',
  date_to: '2023-10-31',
  parameters: {
    theme: 'infectious_disease',
    sub_theme: 'respiratory',
    topic: 'COVID-19',
    metric: 'COVID-19_deaths_ONSByWeek',
    stratum: 'default',
    age: 'all',
    sex: 'all',
    geography_type: 'Lower Tier Local Authority',
    geographies: [],
  },
  accompanying_points: [
    {
      label_prefix: 'Rate of cases in England: ',
      label_suffix: '',
      parameters: {
        metric: 'COVID-19_cases_rateRollingMean',
        geography_type: 'Nation',
        geography: 'England',
      },
    },
  ],
}
describe('useWeatherHealthAlertList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('handles success response correctly', async () => {
    const response = {
      data: [
        {
          geography_code: 'E07000223',
          geography_type: 'Lower Tier Local Authority',
          geography: 'Adur',
          metric_value: 0,
          accompanying_points: [
            {
              label_prefix: 'Rate of cases in England:',
              label_suffix: '',
              metric_value: 11.37,
            },
          ],
        },
        {
          geography_code: 'E07000026',
          geography_type: 'Lower Tier Local Authority',
          geography: 'Allerdale',
          metric_value: 0,
          accompanying_points: [
            {
              label_prefix: 'Rate of cases in England:',
              label_suffix: '',
              metric_value: 11.37,
            },
          ],
        },
        {
          geography_code: 'E07000032',
          geography_type: 'Lower Tier Local Authority',
          geography: 'Amber Valley',
          metric_value: 0,
          accompanying_points: [
            {
              label_prefix: 'Rate of cases in England:',
              label_suffix: '',
              metric_value: 11.37,
            },
          ],
        },
      ],
      latest_date: '2023-10-30',
    }

    mockPostMapData.mockResolvedValueOnce({
      success: true,
      data: response,
    })

    const { result } = renderHook(() => useMapData(request), { wrapper })

    await waitFor(() => expect(result.current.data).toEqual(response))
  })

  it('handles error response gracefully', async () => {
    mockPostMapData.mockResolvedValueOnce({
      success: false,
      error: new ZodError([]),
    })

    const { result } = renderHook(() => useMapData(request), { wrapper })

    await waitFor(() => expect(result.current.data).toBeUndefined)
  })
})
