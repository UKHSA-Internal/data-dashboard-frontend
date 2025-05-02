import { z } from 'zod'

import { BannerVariant } from '@/app/components/ui/ukhsa/GlobalBanner/GlobalBanner'

const BannerTypeSchema = z.enum(['Warning', 'Information']) as z.ZodType<BannerVariant>

const Announcement = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  banner_type: BannerTypeSchema,
})

export const Announcements = z.array(Announcement)
export type Announcements = z.infer<typeof Announcements>
