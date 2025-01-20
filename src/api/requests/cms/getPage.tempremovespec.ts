// import z from 'zod'

// import { client } from '@/api/utils/api.utils'
// import { logger } from '@/lib/logger'

// import { getPage, responseSchema } from './getPage'

// type SuccessResponse = z.SafeParseSuccess<z.infer<typeof responseSchema>>
// type ErrorResponse = z.SafeParseError<z.infer<typeof responseSchema>>

// test('Returns a full page from thge cms by id', async () => {
//   jest.mocked(client).mockResolvedValueOnce({ data: dashboardMock, status: 200 })

//   const result = await getPage(dashboardMock.id)

//   expect(result).toEqual<SuccessResponse>({
//     success: true,
//     data: dashboardMock,
//   })
// })

// test('Handles invalid json received from the api', async () => {
//   jest.mocked(client).mockResolvedValueOnce({ data: { ...dashboardMock, last_published_at: null }, status: 200 })

//   const result = await getPage(dashboardMock.id)

//   expect(result).toEqual<ErrorResponse>({
//     success: false,
//     error: expect.any(Object),
//   })
// })

// test('Handles generic http errors', async () => {
//   jest.mocked(client).mockRejectedValueOnce({ status: 400 })

//   const result = await getPage(dashboardMock.id)

//   expect(logger.error).toHaveBeenCalledTimes(1)

//   expect(result).toEqual<ErrorResponse>({
//     success: false,
//     error: expect.any(Object),
//   })
// })
