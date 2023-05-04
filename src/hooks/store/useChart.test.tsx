import { ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { useChart } from './useChart'
import StoreProvider from '@/lib/StoreProvider'
import { StoreState } from '@/lib/store'

beforeEach(() => {
  console.error = jest.fn()
})

test('picks out a chart from the store using the provided id', () => {
  const charts: StoreState['charts'] = {
    'mocked-charts': {
      success: true,
      data: 'mocked-svg-data',
    },
  }

  const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider {...{ charts }}>{children}</StoreProvider>

  const { result } = renderHook(() => useChart('mocked'), { wrapper })

  expect(result.current).toEqual('mocked-svg-data')
})

test('throws an error if the provided id does not exist within the store', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider>{children}</StoreProvider>

  expect(() => {
    renderHook(() => useChart('mocked'), { wrapper })
  }).toThrow(
    Error(
      "Missing chart mocked-charts. Either the id is invalid or the chart isn't being pre-generated in getStaticProps"
    )
  )
})
