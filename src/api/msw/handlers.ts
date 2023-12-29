import { cms, downloads, headlines, suggestions, tabular, trends } from '../mocks'

export const handlers = [
  ...cms.handlers,
  ...headlines.handlers,
  ...trends.handlers,
  ...tabular.handlers,
  ...downloads.handlers,
  ...suggestions.handlers,
]
