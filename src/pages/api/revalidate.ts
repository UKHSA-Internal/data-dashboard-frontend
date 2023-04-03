import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATE_API_KEY) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Consumers must provide a valid route path e.g. /about
    if (!req.query.path) throw new Error('No path to revalidate provided')

    const page = String(req.query.path)

    await res.revalidate(page)

    console.log('Successful revalidation - ', page)

    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
