import { z } from 'zod'

export const DATA_CLASSIFICATIONS = [
  'official',
  'official_sensitive',
  'protective_marking_not_set',
  'secret',
  'top_secret',
] as const

export const DEFAULT_DATA_CLASSIFICATION: DataClassification = 'official_sensitive'

export const DATA_CLASSIFICATION_LABELS = {
  official: 'OFFICIAL',
  official_sensitive: 'OFFICIAL-SENSITIVE',
  protective_marking_not_set: 'PROTECTIVE MARKING NOT SET',
  secret: 'SECRET',
  top_secret: 'TOP SECRET',
} satisfies Record<DataClassification, string>

export const DATA_CLASSIFICATION_COLORS = {
  official: 'bg-[#2B71C7]',
  official_sensitive: 'bg-[#2B71C7]',
  protective_marking_not_set: 'bg-[#616161]',
  secret: 'bg-[#F39C2C]',
  top_secret: 'bg-[#AA0000]',
} satisfies Record<DataClassification, string>

export const DataClassification = z.enum(DATA_CLASSIFICATIONS)
export type DataClassification = z.infer<typeof DataClassification>
