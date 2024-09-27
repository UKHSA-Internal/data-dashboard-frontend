import { z } from 'zod'

const baseUrl = process.env.API_URL ?? ''

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
    const req = await fetch(`${baseUrl}/api/global-banners/v1`, {
      method: 'GET',
    })
    const json = await req.json()

    return responseSchema.safeParse(json)
  } catch (error) {
    return responseSchema.safeParse(error)
  }
}
