import { Request, Response } from 'express'

export default async function handler(req: Request, res: Response) {
  try {
    if (req.method !== 'POST') {
      console.error(`Unsupported request method ${req.method}`)
      return res.status(405)
    }

    return res.status(200)
  } catch (error) {
    console.error(error)
    return res.status(500)
  }
}
