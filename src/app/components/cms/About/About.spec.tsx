import { render } from '@/config/test-utils'

import About from './About'

describe('About', () => {
  test('renders a link with an href styled as a primary button', async () => {
    const description: string = 'Test string'

    const { getByText } = render(await About({ description }))

    expect(getByText(description)).toBeInTheDocument()
  })
})
