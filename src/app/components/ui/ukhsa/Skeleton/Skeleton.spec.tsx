import React from 'react'

import { render } from '@/config/test-utils'

import { Skeleton } from './Skeleton'

describe('Skeleton Component', () => {
  test('renders with default class and no additional class', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('animate-pulse bg-grey-3')
  })

  test('renders with additional class', () => {
    const { container } = render(<Skeleton className="ukhsa-custom-class" />)
    expect(container.firstChild).toHaveClass('animate-pulse bg-grey-3 ukhsa-custom-class')
  })

  test('renders with additional props', () => {
    const { container } = render(<Skeleton id="skeleton" />)
    expect(container.firstChild).toHaveAttribute('id', 'skeleton')
  })

  test('renders with custom children', () => {
    const { getByTestId } = render(
      <Skeleton>
        <span data-testid="custom-child">Custom Child</span>
      </Skeleton>
    )
    expect(getByTestId('custom-child')).toBeInTheDocument()
    expect(getByTestId('custom-child')).toHaveTextContent('Custom Child')
  })
})
