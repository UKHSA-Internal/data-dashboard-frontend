import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { Breadcrumbs } from './Breadcrumbs'

jest.mocked(client).mockResolvedValue({
  data: allPagesMock,
  status: 200,
})

/**
 * Jest does not support RSC yet so we must await the component as a function
 */
test('renders breadcrumbs', async () => {
  const { getByRole } = render(
    await Breadcrumbs({
      breadcrumbs: [
        { name: 'Home', link: '/home' },
        { name: 'Breadcrumb test', link: '/breadbrumb-test' },
      ],
    })
  )

  expect(getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/home')
  expect(getByRole('link', { name: 'Breadcrumb test' })).toHaveAttribute('href', '/breadbrumb-test')
})
