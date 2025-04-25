import { z } from 'zod'

import { BannerVariant } from '@/app/components/ui/ukhsa/GlobalBanner/GlobalBanner'

const BannerTypeSchema = z.enum(['Warning', 'Information']) as z.ZodType<BannerVariant>

const Badge = z.object({
  id: z.number(),
  meta: z.object({
    type: z.string(),
  }),
})

const Announcement = z.object({
  id: z.number(),
  meta: z.object({
    type: z.literal('whats_new.WhatsNewParentPageAnnouncement'),
  }),
  title: z.string(),
  badge: Badge,
  body: z.string(),
  banner_type: BannerTypeSchema,
  is_active: z.boolean(),
})

export const Announcements = z.array(Announcement)
export type Announcements = z.infer<typeof Announcements>
