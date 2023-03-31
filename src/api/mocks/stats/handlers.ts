import { rest } from 'msw'
import { coronavirusStatsMock } from './data/topics/coronavirus'
import { influenzaStatsMock } from './data/topics/influenza'
import { getStatsApiPath } from '@/api/requests/helpers'

const baseUrl = getStatsApiPath()

export const handlers = [
  rest.get(`${baseUrl}/:topic`, (req, res, ctx) => {
    if (req.headers.get('X-Api-Key') !== process.env.API_KEY) {
      return res(ctx.status(403), ctx.json({ detail: 'You do not have permission to perform this action' }))
    }

    const topicName = String(req.params.topic)

    if (topicName === 'COVID-19') {
      return res(ctx.status(200), ctx.json(coronavirusStatsMock))
    }

    if (topicName === 'Influenza') {
      return res(ctx.status(200), ctx.json(influenzaStatsMock))
    }
  }),
]
