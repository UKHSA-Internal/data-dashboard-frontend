import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { createReadStream, statSync } from 'fs'

/**
 * This is a temporary API route to simulate the download functionality that will
 * eventually come from the backend service
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = path.join(process.cwd(), 'public/mock-data.csv')
  const { size } = statSync(file)

  res.writeHead(200, {
    'Content-Type': 'text/csv',
    'Content-Length': size,
  })

  const readStream = createReadStream(file)

  readStream.pipe(res)
}
