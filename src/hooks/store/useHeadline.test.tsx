import { ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { useHeadline } from './useHeadline'
import StoreProvider from '@/lib/StoreProvider'
import { StoreState } from '@/lib/store'

beforeEach(() => {
  console.error = jest.fn()
})

test('picks out a headline from the store using the provided id', () => {
  const headlines: StoreState['headlines'] = {
    'mocked-headlines': {
      success: true,
      data: {
        value: 12000,
      },
    },
  }

  const wrapper = ({ children }: { children: ReactNode }) => (
    <StoreProvider {...{ headlines }}>{children}</StoreProvider>
  )

  const { result } = renderHook(() => useHeadline('mocked'), { wrapper })

  expect(result.current).toEqual(12000)
})

test('throws an error if the provided id does not exist within the store', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider>{children}</StoreProvider>

  expect(() => {
    renderHook(() => useHeadline('mocked'), { wrapper })
  }).toThrow(
    Error(
      "Missing headline mocked-headlines. Either the id is invalid or the headline isn't being pre-generated in getStaticProps"
    )
  )
})
