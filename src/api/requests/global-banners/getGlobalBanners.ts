import axios from 'axios'
import { z } from 'zod'

import { getApiBaseUrl } from '../helpers'

const baseUrl = getApiBaseUrl()

export const bannerTypes = z.enum(['Information', 'Warning'])

export const responseSchema = z.object({
  active_global_banner: z
    .object({
      title: z.string(),
      body: z.string(),
      banner_type: bannerTypes,
    })
    .or(z.null()),
})

export type ResponseSchema = z.infer<typeof responseSchema>

export const getGlobalBanners = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/global-banners/v1`, {
      method: 'GET',
    })

    return responseSchema.safeParse(data)
  } catch (error) {
    return responseSchema.safeParse(error)
  }
}
