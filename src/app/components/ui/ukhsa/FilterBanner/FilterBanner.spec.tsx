import { render } from '@/config/test-utils'

import { FilterBanner } from './FilterBanner'
 
describe('FilterBanner', () => {

  const testMessage = '<p>This is a test message</p>'
 
  test('renders message with icon when showIcon is true', () => {

    const { getByText, container } = render(
<FilterBanner message={testMessage} showIcon={true} />

    )
 
    // Check message is rendered

    expect(getByText('This is a test message')).toBeVisible()
 
    // Check SVG icon is present

    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
 
    // Check className on container

    expect(container.firstChild).toHaveClass(

      'govuk-!-padding-3 flex bg-blue text-white'

    )

  })
 
  test('renders message without icon when showIcon is false', () => {

    const { getByText, container } = render(
<FilterBanner message={testMessage} showIcon={false} />

    )
 
    expect(getByText('This is a test message')).toBeVisible()
 
    const svg = container.querySelector('svg')

    expect(svg).not.toBeInTheDocument()

  })
 
  test('renders correctly when showIcon is undefined', () => {

    const { getByText, container } = render(
<FilterBanner message={testMessage} />

    )
 
    expect(getByText('This is a test message')).toBeVisible()
 
    const svg = container.querySelector('svg')

    expect(svg).not.toBeInTheDocument()

  })

})
