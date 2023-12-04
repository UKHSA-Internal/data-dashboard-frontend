'use client'

import { ReactNode, useEffect, useState } from 'react'

interface AreaSelectorLoaderProps {
  children: ReactNode
}

export function AreaSelectorLoader({ children }: AreaSelectorLoaderProps) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.addEventListener('topic.location.change', (e) => {
      const { detail } = e as CustomEvent
      setLoading(detail.loading)
    })
  }, [])

  if (loading) {
    return <div className="animate-pulse cursor-progress motion-reduce:animate-none">{children}</div>
  }

  return children
}
