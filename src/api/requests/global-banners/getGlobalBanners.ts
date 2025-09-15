import { z } from 'zod'

import { client } from '@/api/utils/api.utils'
import { BannerVariant } from '@/app/components/ui/ukhsa/GlobalBanner/GlobalBanner'
import { logger } from '@/lib/logger'

export const bannerTypes = z.enum(['Information', 'Warning']) as z.ZodType<BannerVariant>

export const responseSchema = z.object({
  active_global_banners: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
      banner_type: bannerTypes,
    })
  ),
})

export type ResponseSchema = z.infer<typeof responseSchema>

export const getGlobalBanners = async () => {
  try {
    const { data } = await client<z.infer<typeof responseSchema>>('global-banners/v2')
    return responseSchema.safeParse(data)
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message)
    }
    return responseSchema.safeParse(error)
  }
}
