import { rest } from 'msw'
import { coronavirusStatsMock } from './data/topics/coronavirus'
import { influenzaStatsMock } from './data/topics/influenza'
import { getStatsApiPath } from '@/api/requests/helpers'

const baseUrl = getStatsApiPath()

export const handlers = [
  rest.get(`${baseUrl}/:topic`, (req, res, ctx) => {
    const topicName = String(req.params.topic)

    if (topicName === 'coronavirus') {
      return res(ctx.status(200), ctx.json(coronavirusStatsMock))
    }

    if (topicName === 'influenza') {
      return res(ctx.status(200), ctx.json(influenzaStatsMock))
    }
  }),
]
