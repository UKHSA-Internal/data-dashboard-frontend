import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const responseSchema = z.object({
  active_menu: z.array(
    z.object({
      type: z.literal('link'),
      value: z.object({
        title: z.string(),
        page: z.number(),
        html_url: z.string(),
      }),
      id: z.string(),
    })
  ),
})

export type Response = z.infer<typeof responseSchema>

export const getMenu = async () => {
  try {
    const { data } = await client<Response>('menus/v2')
    const result = responseSchema.safeParse(data)
    if (result.success) {
      return result
    } else {
      logger.error(`getMenu parse error: ${result.error}`)
      return responseSchema.safeParse(result.error)
    }
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
