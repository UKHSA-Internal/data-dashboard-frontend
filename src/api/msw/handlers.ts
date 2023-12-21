import { charts, cms, downloads, suggestions, tabular } from '../mocks'

export const handlers = [
  ...cms.handlers,
  ...charts.handlers,
  ...tabular.handlers,
  ...downloads.handlers,
  ...suggestions.handlers,
]
