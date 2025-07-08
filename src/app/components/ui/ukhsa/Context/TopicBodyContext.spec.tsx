import React from 'react'

import { render, waitFor } from '@/config/test-utils'

import { TopicBodyContext , TopicBodyContextProvider, useTopicBodyFilters } from '../Context/TopicBodyContext'

type HookValue = ReturnType<typeof useTopicBodyFilters>

// Helper component to test the hook
function HookTestComponent({ initialFilters, callback }: { initialFilters?: string[], callback: (value: HookValue) => void }) {
  const value = useTopicBodyFilters(initialFilters)
  React.useEffect(() => {
    callback(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

describe('useTopicBodyFilters', () => {
  it('initializes with default filters', () => {
    let result: HookValue | undefined
    render(<HookTestComponent callback={hookValue => { result = hookValue }} />)
    expect(result?.[0]).toEqual(['Leicester', 'London', '6-in-1'])
  })

  it('initializes with custom filters', () => {
    let result: HookValue | undefined
    render(<HookTestComponent initialFilters={['A', 'B']} callback={hookValue => { result = hookValue }} />)
    expect(result?.[0]).toEqual(['A', 'B'])
  })

//   it('addFilter adds a new filter and does not add duplicates', async () => {
//     let result: HookValue | undefined
//     render(<HookTestComponent initialFilters={['A']} callback={hookValue => { result = hookValue }} />)
//     result?.[1].addFilter('B')
//     await waitFor(() => {
//       expect(result?.[0]).toEqual(['A', 'B'])
//     })
//     result?.[1].addFilter('A')
//     await waitFor(() => {
//       expect(result?.[0]).toEqual(['A', 'B'])
//     })
//   })

//   it('removeFilter removes a filter', () => {
//     let result: HookValue | undefined
//     render(<HookTestComponent initialFilters={['A', 'B']} callback={hookValue => { result = hookValue }} />)
//     act(() => {
//       result?.[1].removeFilter('A')
//     })
//     expect(result?.[0]).toEqual(['B'])
//   })

//   it('clearFilters clears all filters', () => {
//     let result: HookValue | undefined
//     render(<HookTestComponent initialFilters={['A', 'B']} callback={hookValue => { result = hookValue }} />)
//     act(() => {
//       result?.[1].clearFilters()
//     })
//     expect(result?.[0]).toEqual([])
//   })

//   it('updateFilters sets new filters', () => {
//     let result: HookValue | undefined
//     render(<HookTestComponent initialFilters={['A']} callback={hookValue => { result = hookValue }} />)
//     act(() => {
//       result?.[1].updateFilters(['X', 'Y'])
//     })
//     expect(result?.[0]).toEqual(['X', 'Y'])
//   })
})

describe('TopicBodyContextProvider', () => {
  it('provides context value to children', () => {
    function Consumer() {
      const value = React.useContext(TopicBodyContext)!
      const [filters] = value
      return <div data-testid="filters">{filters.join(',')}</div>
    }
    const { getByTestId } = render(
      <TopicBodyContextProvider initialFilters={['A', 'B']}>
        <Consumer />
      </TopicBodyContextProvider>
    )
    expect(getByTestId('filters').textContent).toBe('A,B')
  })
}) 