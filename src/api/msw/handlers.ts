import { cms, headlines, trends, charts, tabular } from '../mocks'

export const handlers = [
  ...cms.handlers,
  ...headlines.handlers,
  ...trends.handlers,
  ...charts.handlers,
  ...tabular.handlers,
]
