import { z } from 'zod'

export const HealthAlertTypes = z.enum(['heat', 'cold'])

export const HealthAlertStatus = z.enum(['GREEN', 'RED', 'AMBER', 'YELLOW'])

export const HealthAlert = z.object({
  status: HealthAlertStatus,
  text: z.string(),
  period_start: z.string(),
  period_end: z.string(),
  refresh_date: z.string(),
  geography_name: z.string(),
  geography_code: z.string(),
})

export const HealthAlertList = z.array(
  z.object({
    status: HealthAlertStatus,
    geography_name: z.string(),
    geography_code: z.string(),
  })
)

export type HealthAlert = z.infer<typeof HealthAlert>
export type HealthAlertList = z.infer<typeof HealthAlertList>
export type HealthAlertStatus = z.infer<typeof HealthAlertStatus>
export type HealthAlertTypes = z.infer<typeof HealthAlertTypes>
