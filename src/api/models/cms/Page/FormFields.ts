import { z } from 'zod'

export const FormField = z.object({
  id: z.number(),
  meta: z.object({
    type: z.literal('feedback.FormField'),
  }),
  clean_name: z.string(),
  label: z.string(),
  // field_type: z.union([z.literal('multiline'), z.literal('radio')]), // TODO: Add more types from Phill's message
  field_type: z.string(),
  help_text: z.string(),
  required: z.boolean(),
  choices: z.string(),
  default_value: z.string(),
})

export type FormField = z.infer<typeof FormField>

// TODO: Remove if not needed
// export const FormFields = z.array(FormField)
// export type FormFields = z.infer<typeof FormFields>
