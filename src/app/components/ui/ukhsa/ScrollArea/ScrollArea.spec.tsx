import React from 'react'

import { render } from '@/config/test-utils'

import { ScrollArea } from './ScrollArea'

describe('ScrollArea Component', () => {
  test('renders with default class', () => {
    const { container } = render(<ScrollArea />)
    expect(container.firstChild).toHaveClass('relative overflow-hidden pr-2')
  })

  test('renders with additional class', () => {
    const { container } = render(<ScrollArea className="ukhsa-custom-class" />)
    expect(container.firstChild).toHaveClass('relative overflow-hidden pr-2 ukhsa-custom-class')
  })

  test('renders with additional props', () => {
    const { container } = render(<ScrollArea id="ScrollArea" />)
    expect(container.firstChild).toHaveAttribute('id', 'ScrollArea')
  })

  test('renders with custom children', () => {
    const { getByTestId } = render(
      <ScrollArea>
        <span data-testid="custom-child">Custom Child</span>
      </ScrollArea>
    )
    expect(getByTestId('custom-child')).toBeInTheDocument()
    expect(getByTestId('custom-child')).toHaveTextContent('Custom Child')
  })
})
