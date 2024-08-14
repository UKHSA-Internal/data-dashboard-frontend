import React from 'react'

import { render } from '@/config/test-utils'

import { SummaryList, SummaryListKey, SummaryListRow, SummaryListValue } from './SummaryList'

// Mock the clsx function if needed
jest.mock('@/lib/clsx', () => ({
  clsx: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
}))

describe('SummaryList Components', () => {
  test('SummaryList renders correctly with className', () => {
    const { container } = render(<SummaryList className="ukhsa-custom-class" />)
    expect(container.firstChild).toHaveClass('govuk-summary-list ukhsa-custom-class')
  })

  test('SummaryListRow renders correctly with className', () => {
    const { container } = render(<SummaryListRow className="ukhsa-custom-class" />)
    expect(container.firstChild).toHaveClass('govuk-summary-list__row ukhsa-custom-class')
  })

  test('SummaryListKey renders correctly with className', () => {
    const { container } = render(<SummaryListKey className="ukhsa-custom-class" />)
    expect(container.firstChild).toHaveClass('govuk-summary-list__key ukhsa-custom-class')
  })

  test('SummaryListValue renders correctly with className', () => {
    const { container } = render(<SummaryListValue className="ukhsa-custom-class" />)
    expect(container.firstChild).toHaveClass('govuk-summary-list__value ukhsa-custom-class')
  })

  test('SummaryList components forward refs correctly', () => {
    const ref = React.createRef<HTMLDListElement>()
    render(<SummaryList ref={ref} />)
    expect(ref.current).not.toBeNull()

    const rowRef = React.createRef<HTMLDivElement>()
    render(<SummaryListRow ref={rowRef} />)
    expect(rowRef.current).not.toBeNull()

    const keyRef = React.createRef<HTMLElement>()
    render(<SummaryListKey ref={keyRef} />)
    expect(keyRef.current).not.toBeNull()

    const valueRef = React.createRef<HTMLElement>()
    render(<SummaryListValue ref={valueRef} />)
    expect(valueRef.current).not.toBeNull()
  })

  test('SummaryList components render children correctly', () => {
    const { getByText } = render(
      <SummaryList>
        <SummaryListRow>
          <SummaryListKey>Key</SummaryListKey>
          <SummaryListValue>Value</SummaryListValue>
        </SummaryListRow>
      </SummaryList>
    )

    expect(getByText('Key')).toBeInTheDocument()
    expect(getByText('Value')).toBeInTheDocument()
  })
})
