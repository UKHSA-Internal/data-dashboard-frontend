import { charts, cms, downloads, headlines, suggestions, tabular, trends } from '../mocks'

export const handlers = [
  ...cms.handlers,
  ...headlines.handlers,
  ...trends.handlers,
  ...charts.handlers,
  ...tabular.handlers,
  ...downloads.handlers,
  ...suggestions.handlers,
]
