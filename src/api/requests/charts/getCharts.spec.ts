import 'whatwg-fetch'

import { rest } from 'msw'
import z from 'zod'

import { server } from '@/api/msw/server'
import { chartSizes } from '@/config/constants'
import { logger } from '@/lib/logger'

import { getApiBaseUrl } from '../helpers'
import { getCharts } from './getCharts'

jest.mock('@/lib/logger')

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Supports a narrow and wide chart size', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/charts/v3`, async (req, res, ctx) => {
      const body = await req.json()

      if (body.chart_height === chartSizes.narrow.height && body.chart_width === chartSizes.narrow.width) {
        return res(
          ctx.json({
            chart: 'mocked-narrow',
            last_updated: '123',
          })
        )
      }

      if (body.chart_height === chartSizes.wide.height && body.chart_width === chartSizes.wide.width) {
        return res(
          ctx.json({
            chart: 'mocked-wide',
            last_updated: '123',
          })
        )
      }
    })
  )

  const narrowResponse = await getCharts({
    x_axis: null,
    y_axis: null,
    chart_height: chartSizes.narrow.height,
    chart_width: chartSizes.narrow.width,
    plots: [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        chart_type: 'line_with_shaded_section',
      },
    ],
  })
  expect(narrowResponse).toEqual({
    data: {
      chart: 'mocked-narrow',
      last_updated: '123',
    },
    success: true,
  })

  const wideResponse = await getCharts({
    x_axis: null,
    y_axis: null,
    chart_height: chartSizes.wide.height,
    chart_width: chartSizes.wide.width,
    plots: [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        chart_type: 'line_with_shaded_section',
      },
    ],
  })
  expect(wideResponse).toEqual({
    data: {
      chart: 'mocked-wide',
      last_updated: '123',
    },
    success: true,
  })
})

test('Handles generic http errors', async () => {
  server.use(
    rest.post(`${getApiBaseUrl()}/charts/v3`, (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )

  const result = await getCharts({
    x_axis: null,
    y_axis: null,
    chart_height: chartSizes.wide.height,
    chart_width: chartSizes.wide.width,
    plots: [
      {
        topic: 'COVID-19',
        metric: 'new_cases_7days_sum',
        chart_type: 'line_with_shaded_section',
      },
    ],
  })

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual({
    success: false,
    error: new z.ZodError([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['chart'],
        message: 'Required',
      },
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['last_updated'],
        message: 'Required',
      },
    ]),
  })
})
