import * as z from 'zod'

// export const feedbackSchema = z
//   .object({
//     what_was_your_reason_for_visiting_the_dashboard_today: z.string().optional().nullable(),
//     did_you_find_everything_you_were_looking_for: z.enum(['Yes', 'No']).or(z.undefined()),
//     how_could_we_improve_your_experience_with_the_dashboard: z.string().optional().nullable(),
//     what_would_you_like_to_see_on_the_dashboard_in_the_future: z.string().optional().nullable(),
//   })
//   .required()

export const feedbackSchema = z.record(z.string(), z.string())
