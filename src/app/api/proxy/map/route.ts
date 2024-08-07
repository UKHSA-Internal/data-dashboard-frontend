import assert from 'assert'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { MapTileProvider } from '@/app/types'

export const dynamic = 'force-dynamic'

const osmClientResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.string(),
  issued_at: z.string(),
  token_type: z.string(),
})

const esriClientResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.coerce.string(),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  let clientUrl
  let clientId
  let clientSecret

  const provider: MapTileProvider = body.provider

  if (provider === 'ArcGISEsri') {
    clientUrl = process.env.ESRI_CLIENT_URL
    clientId = process.env.ESRI_CLIENT_KEY
    clientSecret = process.env.ESRI_CLIENT_SECRET
  }

  if (provider === 'OrdinanceSurveyMaps') {
    clientUrl = process.env.OSM_CLIENT_URL
    clientId = process.env.OSM_CLIENT_KEY
    clientSecret = process.env.OSM_CLIENT_SECRET
  }

  assert(clientUrl)
  assert(clientId)
  assert(clientSecret)

  const osmBasicAuth = { Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}` }
  const esriAuth = { client_id: clientId, client_secret: clientSecret }

  const req = await fetch(clientUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(provider === 'OrdinanceSurveyMaps' && osmBasicAuth),
    },
    body: new URLSearchParams({
      ...(provider === 'ArcGISEsri' && esriAuth),
      grant_type: 'client_credentials',
      expiration: '5',
    }),
  })

  const json = await req.json()

  console.log('json', json)
  const parser = provider === 'ArcGISEsri' ? esriClientResponseSchema : osmClientResponseSchema

  const { access_token: token, expires_in: expiresIn } = parser.parse(json)

  return NextResponse.json({
    token,
    expiresIn,
  })
}
