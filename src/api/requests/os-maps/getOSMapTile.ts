import { logger } from '@/lib/logger'

import { getOSAccessToken } from './getOSAccessToken'

// Checking coordinates as from untrusted source
const toTileIndex = (value: string): number | null => {
  const index = Number(value)

  return Number.isInteger(index) && index >= 0 ? index : null
}

export const getOSMapTile = async (zoom: string, x: string, y: string): Promise<Response> => {
  const [z, tileX, tileY] = [zoom, x, y].map(toTileIndex)

  if (z === null || tileX === null || tileY === null) {
    throw new Error('Invalid OS Maps tile coordinates')
  }

  const accessToken = await getOSAccessToken()

  const response = await fetch(`https://api.os.uk/maps/raster/v1/zxy/Light_3857/${z}/${tileX}/${tileY}.png`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    logger.error('OS Maps tile request failed', { status: response.status })
  }

  return response
}
