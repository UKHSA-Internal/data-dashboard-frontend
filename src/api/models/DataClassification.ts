import { z } from 'zod'

export const DataClassification = z.enum(["official", "official_sensitive", "protective_marking_not_set", "secret", "top_secret"]);
export type DataClassification = z.infer<typeof DataClassification>