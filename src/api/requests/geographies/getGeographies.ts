import { z } from 'zod'

import { GeographyType, Topics } from '@/api/models'
import { client } from '@/api/utils/api.utils'
import { logger } from '@/lib/logger'

export const responseSchema = z.array(
  z.object({
    geography_type: z.string(),
    geographies: z.array(
      z.object({
        name: z.string(),
        geography_code: z.string().optional(),
        relationships: z
          .array(
            z
              .object({
                name: z.string().optional().nullable(),
                geography_code: z.string().optional().nullable(),
                geography_type: z.string().optional(),
              })
              .optional()
          )
          .nullable(),
      })
    ),
  })
)

type GeographyParams = {
  topic?: Topics
  geography_type?: GeographyType
}

export const getGeographies = async (params: GeographyParams) => {
  try {
    if (params.topic && params.geography_type) {
      throw new Error('Only one of topic or geography_type can be provided')
    }
    if (params.topic) {
      console.log('retrieving topic geographies')
      try {
        const { data } = await client<z.infer<typeof responseSchema>>(`geographies/v3?topic=${params.topic}`)
        console.log('topic data', data)
        return responseSchema.safeParse(data)
      } catch (error) {
        logger.error(error)

        return responseSchema.safeParse(error)
      }
    }
    if (params.geography_type) {
      try {
        const { data } = await client<z.infer<typeof responseSchema>>(
          `geographies/v3?geography_type=${params.geography_type}`
        )
        return responseSchema.safeParse(data)
      } catch (error) {
        logger.error(error)
        return responseSchema.safeParse(error)
      }
    }
    throw new Error('Either topic or geography_type must be provided')
  } catch (error) {
    logger.error(error)
    return responseSchema.safeParse(error)
  }
}
