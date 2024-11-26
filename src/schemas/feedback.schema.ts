import * as z from 'zod'

export const feedbackSchema = z.record(z.string(), z.string())
