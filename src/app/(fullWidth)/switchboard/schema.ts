import { z, ZodTypeAny } from 'zod'

import { bannerTypes } from '@/api/requests/global-banners/getGlobalBanners'

// TODO: Get status codes enum from npm
export const HTTPStatusCodes = z.enum(['200', '400', '401', '500'])

// TODO: Handle error state
const baseProps = <S extends ZodTypeAny>(selected: S) => {
  return z.object({
    status: HTTPStatusCodes,
    selected,
  })
}

export const switchBoardSchema = z.object({
  api: z.object({
    'global-banners': baseProps(bannerTypes.nullable()),
  }),
  flags: z.object({
    'adverse-weather': baseProps(z.boolean()),
  }),
})

export type switchBoardSchema = z.infer<typeof switchBoardSchema>
