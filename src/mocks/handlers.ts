import { relatedLinks, viruses } from './api'

export const handlers = [...relatedLinks.handlers, ...viruses.handlers]
