'use client'

import { ReactNode, useEffect, useRef } from 'react'

type PopularTopicsCardHeightSyncProps = {
  left: ReactNode
  right: ReactNode
}

function equaliseLeftColumnHeight(left: HTMLDivElement | null, right: HTMLDivElement | null) {
  if (!left || !right) return
  left.style.minHeight = ''
  left.style.minHeight = `${right.offsetHeight}px`
}

export function PopularTopicsCardHeightSync({ left, right }: PopularTopicsCardHeightSyncProps) {
  const leftColumnRef = useRef<HTMLDivElement | null>(null)
  const rightColumnRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const syncHeights = () => equaliseLeftColumnHeight(leftColumnRef.current, rightColumnRef.current)
    syncHeights()

    if (!rightColumnRef.current) return

    const resizeObserver = new ResizeObserver(() => syncHeights())
    resizeObserver.observe(rightColumnRef.current)

    window.addEventListener('resize', syncHeights)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', syncHeights)
    }
  }, [])

  return (
    <div className="govuk-!-margin-bottom-6 grid items-stretch gap-6 lg:grid-cols-2" data-testid="popular-topics-card">
      <div ref={leftColumnRef} className="flex size-full flex-col gap-6">
        {left}
      </div>
      <div ref={rightColumnRef} className="flex h-full flex-col gap-6">
        {right}
      </div>
    </div>
  )
}
