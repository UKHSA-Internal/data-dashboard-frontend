import { z } from 'zod'

import { Topics } from '@/api/models'
import { responseSchema } from '@/api/requests/tables/subplot/getSubplotTables'

import { defaultCoverageTableValues } from '.'

type Fixtures = Record<Topics, z.infer<typeof responseSchema>>

export const fixtures: Fixtures = {
  immunisation: defaultCoverageTableValues,
}
