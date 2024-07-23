import { Mock } from 'ts-mockery'

import { sideMenu } from '@/mock-server/handlers/menus/v1/fixtures/side-menu'

import { getMenu } from './getMenu'
import { transformMenuResponse } from './helpers'

type Response = Awaited<ReturnType<typeof getMenu>>

describe('transformMenuResponse', () => {
  test('should return an empty array if response is not successful', () => {
    const response = Mock.of<Response>({ success: false })
    const result = transformMenuResponse(response)
    expect(result).toEqual([])
  })

  test('should return an empty array if active_menu is not present', () => {
    const response = Mock.of<Response>({ success: true })
    const result = transformMenuResponse(response)
    expect(result).toEqual([])
  })

  test('should transform the response ready for display within the side menu', () => {
    const response = Mock.of<Response>({ success: true, data: sideMenu })

    const expected = [
      {
        slug: '/',
        title: 'Homepage',
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
        slug: '/weather-health-alerts',
        title: 'Weather health alerts',
        children: [],
      },
      {
        slug: '/about',
        title: 'About',
        children: [],
      },
      {
        slug: '/metrics-documentation',
        title: 'Metrics documentation',
        children: [],
      },
      {
        slug: '/whats-new',
        title: "What's new",
        children: [],
      },
      {
        slug: '/access-our-data',
        title: 'Access our data',
        children: [],
      },
    ]

    const result = transformMenuResponse(response)
    expect(result).toEqual(expected)
  })
})
