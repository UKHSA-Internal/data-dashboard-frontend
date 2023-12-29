import { cms, headlines, tabular, trends } from '../mocks'

export const handlers = [...cms.handlers, ...headlines.handlers, ...trends.handlers, ...tabular.handlers]
