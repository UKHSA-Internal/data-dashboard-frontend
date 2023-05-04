import { ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { useTrend } from './useTrend'
import StoreProvider from '@/lib/StoreProvider'
import { StoreState } from '@/lib/store'

beforeEach(() => {
  console.error = jest.fn()
})

test('picks out a trend from the store using the provided id', () => {
  const trends: StoreState['trends'] = {
    'mocked-trends': {
      success: true,
      data: {
        metric_name: 'new_cases_7days_change',
        metric_value: -592,
        percentage_metric_name: 'new_cases_7days_change_percentage',
        percentage_metric_value: -3.0,
        colour: 'green',
        direction: 'down',
      },
    },
  }

  const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider {...{ trends }}>{children}</StoreProvider>

  const { result } = renderHook(() => useTrend('mocked'), { wrapper })

  expect(result.current).toEqual({
    metric_name: 'new_cases_7days_change',
    metric_value: -592,
    percentage_metric_name: 'new_cases_7days_change_percentage',
    percentage_metric_value: -3.0,
    colour: 'green',
    direction: 'down',
  })
})

test('throws an error if the provided id does not exist within the store', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider>{children}</StoreProvider>

  expect(() => {
    renderHook(() => useTrend('mocked'), { wrapper })
  }).toThrow(
    Error(
      "Missing trend mocked-trends. Either the id is invalid or the trend isn't being pre-generated in getStaticProps"
    )
  )
})
