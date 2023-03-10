import { cms, relatedLinks, viruses } from './api'

export const handlers = [
  ...cms.handlers,
  ...relatedLinks.handlers,
  ...viruses.handlers,
]
