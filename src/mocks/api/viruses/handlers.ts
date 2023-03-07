import { rest } from 'msw'
import { data } from './data'

export const handlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/viruses`, (req, res, ctx) => {
    if (!req.url.searchParams.has('searchTerm'))
      return res(ctx.status(200), ctx.json(data))

    const searchTerm = req.url.searchParams.get('searchTerm') as string

    return res(
      ctx.status(200),
      ctx.json({
        ...data,
        viruses: data.viruses.filter(({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })
    )
  }),
]
