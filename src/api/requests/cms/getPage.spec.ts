import z from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'
import { dashboardMock } from '@/mock-server/handlers/cms/pages/fixtures/page'

import { getPage, responseSchema } from './getPage'

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

beforeEach(() => {
  jest.clearAllMocks()
})

test('Returns a full page from the cms by id', async () => {
  jest.mocked(client).mockResolvedValueOnce({ data: dashboardMock, status: 200 })

  const result = await getPage(dashboardMock.id)

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: dashboardMock,
  })
})

test('Handles invalid json received from the api', async () => {
  jest.mocked(client).mockResolvedValueOnce({ data: { ...dashboardMock, last_published_at: null }, status: 200 })

  const result = await getPage(dashboardMock.id)

  expect(result.success).toBe(false)
  expect((result as ErrorResponse).error).toBeDefined()
})

test('Handles generic http errors', async () => {
  jest.mocked(client).mockRejectedValueOnce({ status: 400 })

  const result = await getPage(dashboardMock.id)

  expect(logger.error).toHaveBeenCalledTimes(1)

  expect(result).toEqual<ErrorResponse>({
    success: false,
    error: expect.any(Object),
  })
})

test('Non-public capable pages handle invalid page_classification values', async () => {
  const pageTypes = ['topic.TopicPage', 'metrics_documentation.MetricsDocumentationChildEntry']

  pageTypes.forEach((pageType) => {
    const schema = responseSchema.options.find((schema) => schema.shape.meta.shape.type.value === pageType)
    // check we got what we were looking for
    expect(schema).not.toBeUndefined()
    const pageClassificationSchema = (schema?.shape as any).page_classification
    // check we got what we were looking for
    expect(pageClassificationSchema).not.toBeUndefined()

    // run through some invalid values and check that they are handled correctly
    const invalidValues = ['', 'invalid', null, undefined]
    invalidValues.forEach((value) => {
      const result = pageClassificationSchema.safeParse(value)
      expect(result.success).toBe(true)
      expect(result.value).toBe(undefined)
    })
  })
})
