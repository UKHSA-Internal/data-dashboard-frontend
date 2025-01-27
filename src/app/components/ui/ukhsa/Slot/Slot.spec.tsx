import { render } from '@/config/test-utils'

import { Slot } from './Slot'

describe('Slot component, ', () => {
  // Test the null responses
  test('should return null if no children passed to Slot element', () => {
    const { container } = render(<Slot />)

    // Assert that the container is empty
    expect(container.firstChild).toBeNull()
  })

  test('should return null value if invalidChild element is provided to Slot component', () => {
    const invalidChild = 'empty string'

    const { container } = render(<Slot>{invalidChild}</Slot>)
    expect(container.firstChild).toBeNull
  })

  // Test when multiple children are provided
  test('throws an error when multiple children are provided', () => {
    // Multiple valid React children
    const children = [<div key="1">Child 1</div>, <div key="2">Child 2</div>]

    // Expect rendering the Slot component with multiple children to throw an error
    expect(() => render(<Slot>{children}</Slot>)).toThrow(
      'React.Children.only expected to receive a single React element child.'
    )
  })

  test('uses cloneElement to merge props, styles, and className', () => {
    // Create child component
    const Child = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>Child</div>

    // Render the Slot with a single child
    const { getByText } = render(
      <Slot style={{ backgroundColor: 'blue' }} className="parent-class" aria-label="slot">
        <Child className="child-class" />
      </Slot>
    )

    // Find the rendered child component
    const childElement = getByText('Child')

    // Assert that the className values are merged correctly
    expect(childElement).toHaveClass('parent-class child-class')

    // Assert that additional props are applied correctly
    expect(childElement).toHaveAttribute('aria-label', 'slot')
  })
})
