import { ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { useTabular } from './useTabular'
import StoreProvider from '@/lib/StoreProvider'
import { StoreState } from '@/lib/store'

beforeEach(() => {
  console.error = jest.fn()
})

test('picks out tabular data from the store using the provided id', () => {
  const tabular: StoreState['tabular'] = {
    'mocked-tabular': {
      success: true,
      data: [
        {
          date: '123',
          values: [
            {
              label: 'Plot1',
              value: 456,
            },
          ],
        },
      ],
    },
  }

  const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider {...{ tabular }}>{children}</StoreProvider>

  const { result } = renderHook(() => useTabular('mocked'), { wrapper })

  expect(result.current).toEqual([
    {
      date: '123',
      value: 456,
    },
  ])
})

test('throws an error if the provided id does not exist within the store', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <StoreProvider>{children}</StoreProvider>

  expect(() => {
    renderHook(() => useTabular('mocked'), { wrapper })
  }).toThrow(
    Error(
      "Missing tabular data mocked-tabular. Either the id is invalid or the data isn't being pre-generated in getStaticProps"
    )
  )
})
