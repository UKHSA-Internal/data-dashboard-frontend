// import { getTabularApiPath } from '@/api/requests/helpers'
// import { rest } from 'msw'
// import { newCasesDailyMock } from './data/COVID-19/new_cases_daily'

// const baseUrl = getTabularApiPath()

export const handlers = [
  // rest.get(`${baseUrl}/:topic/:metric`, (req, res, ctx) => {
  //   if (req.headers.get('Authorization') !== process.env.API_KEY) {
  //     return res(ctx.status(403), ctx.json({ detail: 'You do not have permission to perform this action' }))
  //   }
  //   return res(ctx.status(200), ctx.json(newCasesDailyMock))
  // }),
]
