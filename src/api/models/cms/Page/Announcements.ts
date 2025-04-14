import { z } from 'zod'

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
  banner_type: z.string(),
  is_active: z.boolean(),
})

export const Announcements = z.array(Announcement)
export type Announcements = z.infer<typeof Announcements> 