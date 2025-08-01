import React from 'react'

import { act, render, renderHook, screen } from '@/config/test-utils'

import { TopicBodyContext, TopicBodyContextProvider, useTopicBodyFilters } from './TopicBodyContext'

// --- Hook Tests ---
describe('useTopicBodyFilters', () => {
  it('initializes with default filters', () => {
    const { result } = renderHook(() => useTopicBodyFilters())
    // Initial default - TODO: This needs removing back to an empty array before real use
    expect(result.current[0]).toEqual(['Leicester', 'London', '6-in-1'])
  })

  it('initializes with custom filters', () => {
    const { result } = renderHook(() => useTopicBodyFilters())
    expect(result.current[0]).toEqual(['North East', 'East Midlands'])
  })

  it('updateFilters sets new filters', async () => {
    const { result } = renderHook(() => useTopicBodyFilters())
    await act(async () => {
      result.current[1].updateFilters(['South East', 'South West'])
    })
    expect(result.current[0]).toEqual(['South East', 'South West'])
  })

  it('addFilter adds a filter if not present', async () => {
    const { result } = renderHook(() => useTopicBodyFilters())
    await act(async () => {
      result.current[1].addFilter('South East')
    })
    expect(result.current[0]).toEqual(['North East', 'East Midlands', 'South East'])
  })

  it('addFilter does not add duplicates', async () => {
    const { result } = renderHook(() => useTopicBodyFilters())
    await act(async () => {
      result.current[1].addFilter('North East')
    })
    expect(result.current[0]).toEqual(['North East', 'East Midlands'])
  })

  it('removeFilter removes a filter', async () => {
    const { result } = renderHook(() => useTopicBodyFilters())
    await act(async () => {
      result.current[1].removeFilter('South East')```
    })
    expect(result.current[0]).toEqual(['South West'])
  })

  it('clearFilters removes all filters', async () => {
    const { result } = renderHook(() => useTopicBodyFilters())
    await act(async () => {
      result.current[1].clearFilters()
    })
    expect(result.current[0]).toEqual([])
  })
})

// --- Context Provider Tests ---
const ConsumerComponent = () => {
  const value = React.useContext(TopicBodyContext)
  if (!value) return <div>No context</div>
  const [filters, { addFilter, clearFilters }] = value
  return (
    <>
      <div data-testid="filters">{filters.join(',')}</div>
      <button onClick={() => addFilter('Test')}>Add</button>
      <button onClick={clearFilters}>Clear</button>
    </>
  )
}

describe('TopicBodyContextProvider', () => {
  it('provides default filters to children', () => {
    render(
      <TopicBodyContextProvider>
        <ConsumerComponent />
      </TopicBodyContextProvider>
    )
    expect(screen.getByTestId('filters').textContent).toBe('Leicester,London,6-in-1')
  })

  it('addFilter updates context filters', async () => {
    render(
      <TopicBodyContextProvider>
        <ConsumerComponent />
      </TopicBodyContextProvider>
    )
    await act(async () => {
      screen.getByText('Add').click()
    })
    expect(screen.getByTestId('filters').textContent).toBe('Leicester,London,6-in-1,Test')
  })

  it('clearFilters clears context filters', async () => {
    render(
      <TopicBodyContextProvider>
        <ConsumerComponent />
      </TopicBodyContextProvider>
    )
    await act(async () => {
      screen.getByText('Clear').click()
    })
    expect(screen.getByTestId('filters').textContent).toBe('')
  })
})
