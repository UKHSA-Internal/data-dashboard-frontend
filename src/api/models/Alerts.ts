import { z } from 'zod'

export const HealthAlertTypes = z.enum(['heat', 'cold'])

export const HealthAlertStatus = z.enum(['Green', 'Red', 'Amber', 'Yellow'])

export const HealthAlert = z.object({
  status: HealthAlertStatus,
  risk_score: z.number(),
  text: z.string(),
  likelihood: z.string().nullable(),
  impact: z.string().nullable(),
  period_start: z.string().nullable(),
  period_end: z.string().nullable(),
  refresh_date: z.string().nullable(),
  geography: z.string(),
  geography_code: z.string(),
})

export const HealthAlertList = z.array(
  z.object({
    status: HealthAlertStatus,
    geography_name: z.string(),
    geography_code: z.string(),
    refresh_date: z.string().nullable(),
  })
)

export type HealthAlert = z.infer<typeof HealthAlert>
export type HealthAlertList = z.infer<typeof HealthAlertList>
export type HealthAlertStatus = z.infer<typeof HealthAlertStatus>
export type HealthAlertTypes = z.infer<typeof HealthAlertTypes>
