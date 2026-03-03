import React from 'react'

import { act, render, screen } from '@/config/test-utils'

import { LayoutProvider, useLayout } from './LayoutContext'

const TestComponent = () => {
  const { showBanner, setShowBanner } = useLayout()
  return (
    <>
      <span data-testid="showBanner">{String(showBanner)}</span>
      <button onClick={() => setShowBanner(true)}>show</button>
      <button onClick={() => setShowBanner(false)}>hide</button>
    </>
  )
}

describe('LayoutContext', () => {
  it('should have null as the initial showBanner value', () => {
    render(
      <LayoutProvider>
        <TestComponent />
      </LayoutProvider>
    )

    expect(screen.getByTestId('showBanner')).toHaveTextContent('null')
  })

  it('should set showBanner to true when setShowBanner is called with true', () => {
    render(
      <LayoutProvider>
        <TestComponent />
      </LayoutProvider>
    )

    act(() => {
      screen.getByText('show').click()
    })

    expect(screen.getByTestId('showBanner')).toHaveTextContent('true')
  })

  it('should set showBanner to false when setShowBanner is called with false', () => {
    render(
      <LayoutProvider>
        <TestComponent />
      </LayoutProvider>
    )

    act(() => {
      screen.getByText('hide').click()
    })

    expect(screen.getByTestId('showBanner')).toHaveTextContent('false')
  })

  it('should update showBanner from true to false', () => {
    render(
      <LayoutProvider>
        <TestComponent />
      </LayoutProvider>
    )

    act(() => screen.getByText('show').click())
    expect(screen.getByTestId('showBanner')).toHaveTextContent('true')

    act(() => screen.getByText('hide').click())
    expect(screen.getByTestId('showBanner')).toHaveTextContent('false')
  })
})
