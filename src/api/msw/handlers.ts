import { cms, stats, headlines, trends, charts, tabular } from '../mocks'

export const handlers = [
  ...cms.handlers,
  ...stats.handlers,
  ...headlines.handlers,
  ...trends.handlers,
  ...charts.handlers,
  ...tabular.handlers,
]
