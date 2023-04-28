import { z } from 'zod'

export const FileFormats = z.enum(['svg', 'png', 'jpg'])
