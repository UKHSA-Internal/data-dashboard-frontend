import { cms, viruses } from '../mocks'

export const handlers = [
  ...cms.handlers,

  // The below were for proof-of-concept reasons (no confirmations yet on BE api)
  ...viruses.handlers,
]
