import { ZodError } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { useMenu } from './menu.utils'

const clientMock = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
})

test('fetches then formats the cms pages into a navigation menu', async () => {
  clientMock.mockResolvedValueOnce({
    data: {
      ...allPagesMock,
      items: allPagesMock.items.filter((page) => page.meta.show_in_menus),
    },
    status: 200,
  })
  const menu = await useMenu()

  expect(menu).toStrictEqual([
    {
      title: 'Homepage',
      slug: '/',
      children: [
        {
          slug: '/topics/covid-19',
          title: 'COVID-19',
        },
        {
          slug: '/topics/influenza',
          title: 'Influenza',
        },
        {
          slug: '/topics/other-respiratory-viruses',
          title: 'Other respiratory viruses',
        },
      ],
    },
    { title: 'About', slug: '/about' },
    { title: 'Bulk downloads', slug: '/bulk-downloads' },
    { title: 'Access our data', slug: '/access-our-data' },
    { title: "What's new", slug: '/whats-new' },
    { title: 'Metrics documentation', slug: '/metrics-documentation' },
  ])
})

test('handles failed fetches to the cms', async () => {
  clientMock.mockRejectedValue({
    data: null,
    status: 500,
  })

  const menu = await useMenu()

  expect(logger.error).toHaveBeenCalledWith(
    new ZodError([
      {
        code: 'invalid_type',
        expected: 'array',
        received: 'undefined',
        path: ['items'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'object',
        received: 'undefined',
        path: ['meta'],
        message: 'Required',
      },
    ])
  )

  expect(menu).toEqual([
    {
      title: 'Homepage',
      slug: '/',
      children: [],
    },
  ])
})
