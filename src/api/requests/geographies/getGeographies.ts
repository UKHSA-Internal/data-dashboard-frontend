import { z } from 'zod'

import { Topics } from '@/api/models'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const responseSchema = z.array(
  z.object({
    geography_type: z.string(),
    geographies: z.array(
      z.object({
        name: z.string(),
      })
    ),
  })
)

export const getGeographies = async (topic: Topics) => {
  try {
    const { data } = await client<z.infer<typeof responseSchema>>(`geographies/v2/${topic}`)
    logger.info(`GET success geographies/v2/${topic}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
