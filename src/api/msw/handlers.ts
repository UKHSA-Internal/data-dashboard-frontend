import { cms, stats, headlines, trends, charts } from '../mocks'

export const handlers = [
  ...cms.handlers,
  ...stats.handlers,
  ...headlines.handlers,
  ...trends.handlers,
  ...charts.handlers,
]
