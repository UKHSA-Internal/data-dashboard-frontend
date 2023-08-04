import { client } from '@/api/api-utils'
import { allPagesMock } from '@/mock-server/handlers/cms/pages/fixtures/pages'

import { useMenu } from './menu.utils'

jest.mock('@/api/api-utils')

const clientMock = jest.mocked(client)

test('fetches then formats the cms pages into a navigation menu', async () => {
  clientMock.mockResolvedValueOnce({
    data: allPagesMock,
    status: 200,
  })
  const menu = await useMenu()

  expect(menu).toStrictEqual([
    {
      title: 'Dashboard',
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
      slug: process.env.NEXT_PUBLIC_PUBLIC_API_URL,
    },
    { title: 'About', slug: '/about' },
    { title: "What's new", slug: '/whats-new' },
  ])
})

test('handles failed fetches to the cms', async () => {
  clientMock.mockResolvedValueOnce({
    data: null,
    status: 500,
  })

  const menu = await useMenu()
  expect(menu).toEqual([])
})
