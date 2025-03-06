import { z, ZodAny } from 'zod'

import { RelatedLinksLayout } from '@/api/models/cms/Page'
import { bannerTypes } from '@/api/requests/global-banners/getGlobalBanners'

/**
 * Defines the Zod schema for the switchboard configuration.
 * This schema defines the structure of the switchboard configuration using Zod objects and other validators.
 */

// TODO: Handle error state
const baseProps = <S extends ZodAny>(scenario?: z.infer<S>) => {
  return z.object({
    status: z.coerce.number(),
    ...(scenario && { scenario }),
  })
}

export const switchBoardSchema = z.object({
  api: z.object({
    alerts: z.object({
      list: baseProps(),
      detail: baseProps(),
      scenario: z.enum(['Green', 'RedAmberGreenYellow', 'RedAmber', 'NoAlertsYet']),
    }),
    pages: z.object({
      list: baseProps(),
      detail: z.object({
        status: z.coerce.number(),
        scenario: z.object({
          relatedLinksLayout: z.enum([RelatedLinksLayout.Values.Sidebar, RelatedLinksLayout.Values.Footer]),
        }),
      }),
    }),
    'global-banners': baseProps(bannerTypes.or(z.literal(''))),
    menus: baseProps(z.enum(['Inactive', 'MegaMenu'])),
  }),
  flags: z.object({
    'example-flag': z.enum(['enabled', 'disabled']),
  }),
})

export type switchBoardSchema = z.infer<typeof switchBoardSchema>
