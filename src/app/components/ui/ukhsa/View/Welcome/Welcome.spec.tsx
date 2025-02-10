import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { ShowWelcome } from './Welcome'

jest.mocked(client).mockResolvedValue({
  data: allPagesMock,
  status: 200,
})

/**
 * Jest does not support RSC yet so we must await the component as a function
 */
test('renders the showWelcome text if provided', async () => {
  const { getByText } = render(await ShowWelcome())
  const welcomeElement = getByText('Welcome')
  expect(welcomeElement).toBeInTheDocument()
})
