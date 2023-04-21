import { cms, stats, headlines, trends } from '../mocks'

export const handlers = [...cms.handlers, ...stats.handlers, ...headlines.handlers, ...trends.handlers]
