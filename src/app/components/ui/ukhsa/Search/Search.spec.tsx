import userEvent from '@testing-library/user-event'

import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'

import Search from './Search'

const getPages = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
  getPages.mockResolvedValue({
    status: 200,
    data: {
      meta: { total_count: 1 },
      items: [
        {
          id: 1234,
          title: 'Result 1',
          seo_change_frequency: 1234,
          seo_priority: 123,
          meta: {
            type: '',
            detail_url: '',
            html_url: 'http://localhost:3000/result-1',
            slug: '',
            search_description: '',
            show_in_menus: false,
            first_published_at: '',
          },
        },
      ],
    },
  })
})

test('renders input and buttons', async () => {
  const { getByRole } = render(<Search placeholder="Search" label="Search" />)

  const form = getByRole('form', { name: 'Search' })

  expect(form).toBeVisible()
  expect(form).toHaveAttribute('method', 'GET')
  expect(getByRole('textbox')).toBeVisible()
})

test('searching displays results', async () => {
  const search = render(<Search placeholder="Search" label="Search" />)
  const { getByRole, findByRole } = search
  await userEvent.type(getByRole('textbox'), 'query')
  expect(getByRole('textbox').getAttribute('value')).toBe('query')
  expect(await findByRole('link', { name: 'Result 1' })).toBeVisible()
})
