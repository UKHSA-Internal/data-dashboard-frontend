import { client } from '@/api/api-utils'
import { logger } from '@/lib/logger'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { useMenu } from './menu.utils'

const clientMock = jest.mocked(client)

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
    {
      title: 'API',
      slug: process.env.PUBLIC_API_URL,
    },
    { title: 'About', slug: '/about' },
    { title: 'Bulk downloads', slug: '/bulk-downloads' },
    { title: "What's new", slug: '/whats-new' },
    { title: 'Metrics documentation', slug: '/metrics-documentation' },
  ])
})

test('handles failed fetches to the cms', async () => {
  clientMock.mockResolvedValueOnce({
    data: null,
    status: 500,
  })

  const menu = await useMenu()

  expect(logger.error).toHaveBeenCalled()
  expect(menu).toEqual([
    {
      title: 'Homepage',
      slug: '/',
      children: [],
    },
    {
      title: 'API',
      slug: process.env.PUBLIC_API_URL,
    },
  ])
})
