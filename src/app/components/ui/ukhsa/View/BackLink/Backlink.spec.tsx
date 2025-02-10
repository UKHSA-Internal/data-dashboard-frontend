import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { BackLink } from './Backlink'

jest.mocked(client).mockResolvedValue({
  data: allPagesMock,
  status: 200,
})

/**
 * Jest does not support RSC yet so we must await the component as a function
 */

test('renders the back button', async () => {
  const { getByRole } = render(await BackLink({ backlink: 'whats-new' }))
  const backlinkElement = getByRole('link', { name: 'Back' })

  expect(backlinkElement).toHaveAttribute('href', 'whats-new')
})
