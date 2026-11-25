'use client'

import { useEffect } from 'react'

import { clearAcknowledgementMarker } from '@/app/utils/acknowledgement.utils'

export function ClearAcknowledgementOnMount() {
  useEffect(() => {
    clearAcknowledgementMarker()
  }, [])

  return null
}
