import { ChartRelatedLink } from '@/api/models/cms/Page/Body'
import { render } from '@/config/test-utils'

import About from './About'

describe('About', () => {
  test('renders about text in the content', async () => {
    const description: string = 'Test string'

    const { getByText } = render(<About description={description} />)

    expect(getByText(description)).toBeInTheDocument()
  })

  test('renders a header of links and a hyperlink if provided', async () => {
    const testRelatedLinks: ChartRelatedLink = [
      {
        type: 'related_link',
        value: {
          link_display_text: 'Link 1',
          link: 'https://www.google.com',
        },
        id: 'd3fef747-7c5b-46d2-9ea0-da08ee98164d',
      },
    ]

    const description: string = 'Test string'

    const { getByText, getByRole } = render(<About description={description} relatedLinks={testRelatedLinks} />)

    expect(getByText(description)).toBeInTheDocument()
    expect(getByRole('heading', { name: 'Related Links' })).toBeInTheDocument()
    expect(getByRole('link', { name: 'Link 1' })).toBeInTheDocument()
  })

  test('Does not render a related links header of links and a hyperlink if provided', async () => {
    const testRelatedLinks: ChartRelatedLink = []

    const description: string = 'Test string'

    const { getByText } = render(<About description={description} relatedLinks={testRelatedLinks} />)

    expect(getByText(description)).toBeInTheDocument()
  })
})
