import { ReactNode } from 'react'
import StoreProvider from '@/lib/StoreProvider'
import { StoreState } from '@/lib/store'
import { renderHook } from '@testing-library/react'
import { usePercentage } from './usePercentage'

beforeEach(() => {
  console.error = jest.fn()
})

test('picks out a percentage from the store using the provided id', () => {
  const headlines: StoreState['headlines'] = {
    'mocked-percentages': {
      success: true,
      data: {
        value: 50,
      },
    },
  }

  const wrapper = ({ children }: { children: ReactNode }) => (
    <StoreProvider {...{ headlines }}>{children}</StoreProvider>
  )

  const { result } = renderHook(() => usePercentage('mocked'), { wrapper })

  expect(result.current).toEqual(50)
})

test('throws an error if the provided id does not exist within the store', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider>{children}</StoreProvider>

  expect(() => {
    renderHook(() => usePercentage('mocked'), { wrapper })
  }).toThrow(
    Error(
      "Missing percentage mocked-percentages. Either the id is invalid or the percentage isn't being pre-generated in getStaticProps"
    )
  )
})
