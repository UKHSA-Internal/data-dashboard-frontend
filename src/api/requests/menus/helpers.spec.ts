import { Mock } from 'ts-mockery'

import { megaMenu } from '@/mock-server/handlers/menus/v1/fixtures/mega-menu'
import { sideMenu } from '@/mock-server/handlers/menus/v1/fixtures/side-menu'

import { getMenu } from './getMenu'
import { transformMenuSnippetToMegaMenu, transformMenuSnippetToSideMenu } from './helpers'

type Response = Awaited<ReturnType<typeof getMenu>>

describe('Side Menu Transformations', () => {
  test('should return an empty array if response is not successful', () => {
    const response = Mock.of<Response>({ success: false })
    const result = transformMenuSnippetToSideMenu(response)
    expect(result).toEqual([])
  })

  test('should return an empty array if active_menu is not present', () => {
    const response = Mock.of<Response>({ success: true })
    const result = transformMenuSnippetToSideMenu(response)
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

    const result = transformMenuSnippetToSideMenu(response)
    expect(result).toEqual(expected)
  })
})

describe('Mega Menu Transformations', () => {
  test('transform a valid menu response correctly', () => {
    const response = Mock.of<Response>({ success: true, data: megaMenu })
    const result = transformMenuSnippetToMegaMenu(response)
    expect(result).toEqual([
      [
        {
          heading: 'Respiratory viruses',
          links: [
            {
              title: 'COVID-19',
              slug: '/respiratory-viruses/covid-19',
              description: '<p data-block-key="zftwk">COVID-19 respiratory infection statistics</p>',
            },
            {
              title: 'Influenza',
              slug: '/respiratory-viruses/influenza',
              description: '<p data-block-key="27vjw">Flu ICU and HDU admissions and other statistics</p>',
            },
            {
              title: 'Other respiratory viruses',
              slug: '/respiratory-viruses/other-respiratory-viruses',
              description:
                '<p data-block-key="27vjw">Other common respiratory viruses including adenovirus, hMPV &amp; parainfluenza</p>',
            },
            {
              description: '<p data-block-key="27vjw">Childhood vaccination coverage for England</p>',
              slug: '/respiratory-viruses/childhood-vaccinations',
              title: 'Childhood Vaccination Coverage',
            },
          ],
        },
        {
          heading: 'Services and information',
          links: [
            {
              title: 'Homepage',
              slug: '/',
              description: '<p data-block-key="zftwk">The UKHSA data dashboard</p>',
            },
            {
              title: 'About',
              slug: '/about',
              description: '<p data-block-key="27vjw">About the dashboard</p>',
            },
            {
              title: 'Metrics documentation',
              slug: '/metrics-documentation',
              description: '<p data-block-key="27vjw">See all available metrics</p>',
            },
            {
              title: 'Weather health alerts',
              slug: '/weather-health-alerts',
              description: '<p data-block-key="27vjw">Weather health alerting system provided by UKHSA</p>',
            },
            {
              title: 'Access our data',
              slug: '/access-our-data',
              description: '<p data-block-key="27vjw">API developer&#x27;s guide</p>',
            },
          ],
        },
        {
          heading: '',
          links: [
            { title: "What's new", slug: '/whats-new', description: '' },
            { title: "What's coming", slug: '/whats-coming', description: '' },
          ],
        },
      ],
    ])
  })

  test('return an empty array for an empty menu response', () => {
    const emptyResponse = Mock.of<Response>({ success: true, data: { active_menu: [] } })
    const result = transformMenuSnippetToMegaMenu(emptyResponse)
    expect(result).toEqual([])
  })

  test('return an empty array if active_menu is missing', () => {
    const noActiveMenuResponse = Mock.of<Response>({ success: true, data: { active_menu: [] } })
    const result = transformMenuSnippetToMegaMenu(noActiveMenuResponse)
    expect(result).toEqual([])
  })

  test('return an empty array if success is false', () => {
    const unsuccessfulResponse = Mock.of<Response>({ success: false, data: undefined })
    const result = transformMenuSnippetToMegaMenu(unsuccessfulResponse)
    expect(result).toEqual([])
  })

  test('handle a response with missing columns gracefully', () => {
    const responseWithMissingColumns = Mock.of<Response>({
      success: true,
      data: {
        active_menu: [
          {
            value: {
              columns: [],
            },
          },
        ],
      },
    })

    const result = transformMenuSnippetToMegaMenu(responseWithMissingColumns)
    expect(result).toEqual([[]])
  })
})
