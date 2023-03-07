import { rest } from 'msw'
import { data } from './data'

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/related-links`,
    (req, res, ctx) => res(ctx.status(200), ctx.json(data))
  ),
]
