import { z } from 'zod'

import { BannerVariant } from '@/app/components/ui/ukhsa/GlobalBanner/GlobalBanner'

const BannerTypeSchema = z.enum(['Warning', 'Information']) as z.ZodType<BannerVariant>

const Announcement = z.object({
  id: z.number(),
  meta: z.object({
    type: z.string(),
  }),
  title: z.string(),
  body: z.string(),
  banner_type: BannerTypeSchema,
  is_active: z.boolean(),
})

export const Announcements = z.array(Announcement)
export type Announcements = z.infer<typeof Announcements>
