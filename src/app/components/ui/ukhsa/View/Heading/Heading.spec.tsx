import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { Heading } from './Heading'

jest.mocked(client).mockResolvedValue({
  data: allPagesMock,
  status: 200,
})

/**
 * Jest does not support RSC yet so we must await the component as a function
 */

test('renders the heading correctly', async () => {
  const heading = 'Test Heading'
  const { getByRole } = render(await Heading({ heading }))
  const headingElement = getByRole('heading', { level: 1, name: heading })
  expect(headingElement).toBeInTheDocument()
})
