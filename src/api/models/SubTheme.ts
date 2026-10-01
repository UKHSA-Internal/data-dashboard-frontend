import { z } from 'zod'

export const SubTheme = z.string()

export type SubTheme = z.infer<typeof SubTheme>
