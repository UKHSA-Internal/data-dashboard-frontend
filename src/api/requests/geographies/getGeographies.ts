import { z } from 'zod'

import { GeographyType, Topics } from '@/api/models'
import { client } from '@/api/utils/api.utils'
import { isSSR } from '@/app/utils/app.utils'
import { logger } from '@/lib/logger'

const geographiesSchemaObject = z.object({
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

export const geographiesSchema = z.array(geographiesSchemaObject)
export const responseObject = z.object({
  geography_type: z.string(),
  geographies: geographiesSchema,
})

export const responseSchema = z.array(responseObject)
export type GeographiesSchema = z.infer<typeof geographiesSchema>
export type GeographiesSchemaObject = z.infer<typeof geographiesSchemaObject>
export type GeographyObject = z.infer<typeof responseObject>
export type GeographyResponse = z.infer<typeof responseSchema>

export type GeographyParams = {
  topic?: Topics
  geography_type?: GeographyType
}

export const getGeographies = async (params: GeographyParams) => {
  try {
    const path = isSSR ? `geographies/v3` : `proxy/geographies/v3`
    if (params.topic && params.geography_type) {
      throw new Error('Only one of topic or geography_type can be provided')
    }
    if (params.topic) {
      try {
        const { data } = await client<z.infer<typeof responseSchema>>(`${path}?topic=${params.topic}`)
        return responseSchema.safeParse(data)
      } catch (error) {
        logger.error(error)
        return responseSchema.safeParse(error)
      }
    }
    if (params.geography_type) {
      try {
        const { data } = await client<z.infer<typeof responseSchema>>(`${path}?geography_type=${params.geography_type}`)

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
