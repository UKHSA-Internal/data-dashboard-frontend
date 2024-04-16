import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const responseSchema = z.object({
  'active-global-banner': z
    .object({
      title: z.string(),
      body: z.string(),
      banner_type: z.enum(['Information', 'Warning']),
    })
    .or(z.null()),
})

export type ResponseSchema = z.infer<typeof responseSchema>

export const getGlobalBanners = async () => {
  try {
    const { data } = await client<z.infer<typeof responseSchema>>('global-banners/v1')
    return responseSchema.safeParse(data)
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message)
    }
    return responseSchema.safeParse(error)
  }
}
