import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const responseSchema = z.object({
  active_menu: z
    .array(
      z.object({
        type: z.literal('row'),
        value: z.object({
          columns: z.array(
            z.object({
              type: z.literal('column'),
              value: z.object({
                heading: z.string(),
                links: z.object({
                  primary_link: z.object({
                    title: z.string(),
                    body: z.string(),
                    page: z.number(),
                    html_url: z.string(),
                  }),
                  secondary_links: z.array(
                    z.object({
                      type: z.literal('secondary_link'),
                      value: z.object({
                        title: z.string(),
                        body: z.string(),
                        page: z.number(),
                        html_url: z.string(),
                      }),
                      id: z.string(),
                    })
                  ),
                }),
              }),
              id: z.string(),
            })
          ),
        }),
        id: z.string(),
      })
    )
    .nullable(),
})

export type Response = z.infer<typeof responseSchema>

export const getMenu = async () => {
  try {
    const { data } = await client<Response>('menus/v1')
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
