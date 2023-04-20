import { cms, stats, headlines } from '../mocks'

export const handlers = [...cms.handlers, ...stats.handlers, ...headlines.handlers]
