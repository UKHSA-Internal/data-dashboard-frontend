import { cms, relatedLinks, viruses } from '../mocks'

export const handlers = [
  ...cms.handlers,
  ...relatedLinks.handlers,
  ...viruses.handlers,
]
