import { z, ZodTypeAny } from 'zod'

import { bannerTypes } from '@/api/requests/global-banners/getGlobalBanners'

/**
 * Defines the Zod schema for the switchboard configuration.
 * This schema defines the structure of the switchboard configuration using Zod objects and other validators.
 */

// TODO: Handle error state
const baseProps = <S extends ZodTypeAny | undefined>(scenario?: S) => {
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
    'global-banners': baseProps(bannerTypes.or(z.literal(''))),
    menus: baseProps(z.enum(['Inactive', 'SideMenu', 'MegaMenu'])),
  }),
  flags: z.object({
    'adverse-weather': z.enum(['enabled', 'disabled']),
  }),
})

export type switchBoardSchema = z.infer<typeof switchBoardSchema>
