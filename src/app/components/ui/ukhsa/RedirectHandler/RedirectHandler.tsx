// src/app/components/RedirectHandler.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface RedirectHandlerProps {
  newRoute: string
}

const RedirectHandler = ({ newRoute }: RedirectHandlerProps) => {
  const router = useRouter()

  useEffect(() => {
    router.replace(newRoute)
  }, [newRoute, router])

  return null // This component doesn't render anything
}

export default RedirectHandler
