import { charts, cms, downloads, headlines, tabular, trends } from '../mocks'

export const handlers = [
  ...cms.handlers,
  ...headlines.handlers,
  ...trends.handlers,
  ...charts.handlers,
  ...tabular.handlers,
  ...downloads.handlers,
]
