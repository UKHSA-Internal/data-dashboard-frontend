import { z } from 'zod'

import { client } from '@/api/api-utils'
import { logger } from '@/lib/logger'

export const responseSchema = z.object({
  geographies: z.array(
    z.object({
      name: z.string(),
      id: z.number(),
    })
  ),
})

export const getGeographyNames = async (id: number) => {
  try {
    const { data } = await client<z.infer<typeof responseSchema>>(`geographies/v1/types/${id}`)
    logger.info(`GET success geographies/v1/types/${id}`)
    return responseSchema.safeParse(data)
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
