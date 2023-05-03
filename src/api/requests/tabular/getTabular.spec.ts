import { server } from '@/api/msw/server'
import { getTabular, responseSchema } from './getTabular'
import { z } from 'zod'
import { newCasesDailyMock } from '@/api/mocks/tabular/data/COVID-19/new_cases_daily'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
// type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

test('Check new_cases_daily tabular data', async () => {
  const result = await getTabular({
    topic: 'COVID-19',
    metric: 'new_cases_daily',
  })

  expect(result).toEqual<SuccessResponse>({
    success: true,
    data: newCasesDailyMock,
  })
})

// test('Handles invalid jason recieved from the API',async () => {
//     const result = await getTabular({
//         topic: 'COVID-19',
//         metric: 'new_cases_daily',
//       })
// })
