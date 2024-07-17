import assert from 'assert'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const clientUrl = process.env.OSS_CLIENT_URL
const clientId = process.env.OSS_CLIENT_KEY
const clientSecret = process.env.OSS_CLIENT_SECRET

const clientResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.string(),
  issued_at: z.string(),
  token_type: z.string(),
})

export async function POST() {
  assert(clientUrl)
  assert(clientId)
  assert(clientSecret)

  const basicAuth = btoa(`${clientId}:${clientSecret}`)

  const req = await fetch(clientUrl, {
    method: 'POST',
    headers: { Authorization: `Basic ${basicAuth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  })

  const json = await req.json()
  const { access_token: token, expires_in: expiresIn } = clientResponseSchema.parse(json)

  return NextResponse.json({
    token,
    expiresIn,
  })
}
