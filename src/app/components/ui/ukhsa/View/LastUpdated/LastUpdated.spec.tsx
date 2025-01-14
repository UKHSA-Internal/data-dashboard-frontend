import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { LastUpdated } from './LastUpdated'

jest.mocked(client).mockResolvedValue({
  data: allPagesMock,
  status: 200,
})

/**
 * Jest does not support RSC yet so we must await the component as a function
 */

test('renders the lastUpdated text if provided', async () => {
  const lastUpdated = '2023-03-21T10:25:34.452098Z'
  const { getByText } = render(await LastUpdated({ lastUpdated }))
  const lastUpdatedElement = getByText('Last updated on Tuesday, 21 March 2023 at 10:25am')
  expect(lastUpdatedElement).toBeInTheDocument()
})
