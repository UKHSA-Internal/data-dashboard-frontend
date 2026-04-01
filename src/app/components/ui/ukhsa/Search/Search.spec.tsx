import userEvent from '@testing-library/user-event'

import { client } from '@/api/utils/api.utils'
import { render } from '@/config/test-utils'

import Search from './Search'

const mockClient = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
  mockClient.mockResolvedValue({
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

test('searching uses correct query', async () => {
  const query = 'query'
  const search = render(<Search placeholder="Search" label="Search" />)
  const { getByRole, findByRole } = search
  await userEvent.type(getByRole('textbox'), query)
  // Wait for the effect to finish
  await findByRole('link', { name: 'Result 1' })
  expect(mockClient).toHaveBeenCalledTimes(1)
  expect(mockClient.mock.calls[0][1]?.searchParams?.toString()).toEqual(`fields=title&offset=0&search=${query}`)
})
