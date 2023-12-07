import { z } from 'zod'

import { client } from '@/api/api-utils'
import { pagesWithHomeTypeMock } from '@/api/mocks/cms/data/pages'
import { logger } from '@/lib/logger'
import {
  pagesWithMetricsChildTypeMock,
  pagesWithWhatsNewChildTypeMock,
} from '@/mock-server/handlers/cms/pages/fixtures/pages'

import {
  getMetricsPages,
  getPages,
  getWhatsNewPages,
  PageType,
  responseSchema,
  whatsNewResponseSchema,
} from './getPages'

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type WhatsNewSuccessResponse = z.SafeParseSuccess<z.infer<typeof whatsNewResponseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

jest.mock('@/lib/logger')
jest.mock('@/api/api-utils')

const getPagesResponse = jest.mocked(client)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Successfully getting all pages from the cms api ', () => {
  test('Returns a list of cms pages by type', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithHomeTypeMock,
    })

    const response = await getPages(PageType.Home)

    expect(response).toEqual<SuccessResponse>({
      success: true,
      data: pagesWithHomeTypeMock,
    })
  })
})

// Pages tests
describe('Failing to get all pages from the cms api', () => {
  test('invalid json received from the api returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: {
        items: null,
        meta: {
          total_count: 1,
        },
      },
    })

    const response = await getPages(PageType.Home)

    expect(response).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'null',
          path: ['items'],
          message: 'Expected array, received null',
        },
      ]),
    })
  })

  test('invalid http status code returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 404,
      data: {},
    })

    const result = await getPages(PageType.Common)

    expect(logger.info).toHaveBeenNthCalledWith(1, 'GET success pages/?type=common.CommonPage')

    expect(result).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
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
      ]),
    })
  })
})

// What's new tests
describe("Successfully getting all What's new child pages from the cms api", () => {
  test("returns a list of What's new child pages", async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithWhatsNewChildTypeMock,
    })

    const response = await getWhatsNewPages()

    expect(response).toEqual<WhatsNewSuccessResponse>({
      success: true,
      data: {
        meta: {
          total_count: 3,
        },
        items: pagesWithWhatsNewChildTypeMock.items.map((entry) => ({
          ...entry,
          badge: {
            text: entry.badge?.text ?? '',
            colour: entry.badge?.colour ? entry.badge?.colour.toString() : '',
          },
        })),
      },
    })
  })
})

// items: [
//   {
//     id: 22,
//     meta: {
//       type: 'whats_new.WhatsNewChildEntry',
//       detail_url: 'http://localhost/api/pages/22/',
//       html_url: null,
//       slug: 'soft-launch-of-the-ukhsa-data-dashboard',
//       show_in_menus: false,
//       first_published_at: '2023-10-24T16:10:44.385654+01:00',
//     },
//     title: 'Soft launch of the UKHSA data dashboard',
//     date_posted: '2023-09-26',
//     body: '<p data-block-key="tyozk">The UKHSA data dashboard is an iteration of the <a href="https://coronavirus.data.gov.uk/">Coronavirus (COVID-19) in the UK dashboard</a>. The dashboard is launching with data on respiratory viruses, including COVID-19. It will grow to show data on a wider range of health topics. We’ll use feedback from users during the soft launch to improve the service.</p><p data-block-key="brp7b">Once the UKHSA data dashboard passes the government <a href="https://www.gov.uk/service-manual/service-standard">Service Standard</a> assessment, it will replace the COVID-19 dashboard and be the only UKHSA dashboard for public-facing data (including COVID-19 data).</p><p data-block-key="eq6g0">The UKHSA data dashboard is in the initial phase of the government Service Standard assessment and is still undergoing statistical review. For reporting and analytical purposes, continue to use the COVID-19 dashboard.</p>',
//     additional_details: '',
//     badge: {
//       text: 'New Feature',
//       colour: 'grey',
//     },
//   },
//   {
//     id: 23,
//     meta: {
//       type: 'whats_new.WhatsNewChildEntry',
//       detail_url: 'http://localhost/api/pages/23/',
//       html_url: null,
//       slug: 'updated-csv-download-and-tabular-data-functionality',
//       show_in_menus: false,
//       first_published_at: '2023-10-24T17:20:39.627869+01:00',
//     },
//     title: 'Updated CSV download and tabular data functionality',
//     date_posted: '2023-10-04',
//     body: '<p data-block-key="3twc0">We’ve added the functionality to download a CSV file of a graph across all pages.</p><p data-block-key="3b1aa">We’ve updated the tabular data to show all the corresponding data points. Additionally, the table is now in descending order, so the most recent data is visible first. We’ve also added the functionality to scroll through the table, so it remains a consistent size on the page.</p>',
//     additional_details: '',
//     badge: {
//       text: 'New Feature',
//       colour: 'grey',
//     },
//   },
//   {
//     id: 24,
//     meta: {
//       type: 'whats_new.WhatsNewChildEntry',
//       detail_url: 'http://localhost/api/pages/24/',
//       html_url: null,
//       slug: 'other-respiratory-viruses-data-added-to-the-homepage',
//       show_in_menus: false,
//       first_published_at: '2023-10-24T17:22:25.297408+01:00',
//     },
//     title: 'Other respiratory viruses data added to the homepage',
//     date_posted: '2023-10-05',
//     body: '<p data-block-key="n411d">We’ve added data for other respiratory viruses to the homepage of the dashboard. The homepage of the dashboard shows headline positivity figures for:</p><ul><li data-block-key="ebupn">adenovirus</li><li data-block-key="ak17q">human metapneumovirus (hMPV)</li><li data-block-key="6ua0s">parainfluenza</li><li data-block-key="71h21">rhinovirus</li><li data-block-key="8qg4p">respiratory syncytial virus (RSV)</li></ul><p data-block-key="88a0g">Further data can be found on the <a href="https://ukhsa-dashboard.data.gov.uk/topics/other-respiratory-viruses">other respiratory viruses page</a>.</p>',
//     additional_details: '<p data-block-key="vsnf1">Nothing to see here yet</p>',
//     badge: {
//       text: 'Data Issue',
//       colour: 'blue',
//     },
//   },
// ],

describe("Failing to get all What's new child pages from the cms api", () => {
  test('invalid json received from the api returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: {
        items: null,
        meta: {
          total_count: 1,
        },
      },
    })

    const response = await getWhatsNewPages()

    expect(response).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'null',
          path: ['items'],
          message: 'Expected array, received null',
        },
      ]),
    })
  })

  test('invalid http status code returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 404,
      data: {},
    })

    const result = await getWhatsNewPages()

    expect(logger.info).toHaveBeenNthCalledWith(1, 'GET success pages/?type=whats_new.WhatsNewChildEntry&fields=*')

    expect(result).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
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
      ]),
    })
  })
})

// Metrics documentation tests
describe('Successfully getting all Metrics Documentation child pages from the cms api', () => {
  test('returns a list of Metrics Documentation child pages', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: pagesWithMetricsChildTypeMock,
    })

    const response = await getMetricsPages()

    expect(response).toEqual<SuccessResponse>({
      success: true,
      data: pagesWithMetricsChildTypeMock,
    })
  })
})

describe('Failing to get all Metrics Documentation pages from the cms api', () => {
  test('invalid json received from the api returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 200,
      data: {
        items: null,
        meta: {
          total_count: 1,
        },
      },
    })

    const response = await getMetricsPages()

    expect(response).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'null',
          path: ['items'],
          message: 'Expected array, received null',
        },
      ]),
    })
  })

  test('invalid http status code returns an error', async () => {
    getPagesResponse.mockResolvedValueOnce({
      status: 404,
      data: {},
    })

    const result = await getMetricsPages()

    expect(logger.info).toHaveBeenNthCalledWith(
      1,
      'GET success pages/?type=metrics_documentation.MetricsDocumentationChildEntry&fields=*'
    )

    expect(result).toEqual<ErrorResponse>({
      success: false,
      error: new z.ZodError([
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
      ]),
    })
  })
})
