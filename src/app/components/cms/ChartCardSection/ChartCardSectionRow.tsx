'use client'

import { ReactNode, useEffect, useRef } from 'react'

/**
 * Equalises the height of card wrappers in the row (2 or 3 cards). Finds the
 * tallest and sets each wrapper's minHeight to that so all cards match.
 */
function equaliseCardHeights(row: HTMLDivElement | null) {
  if (!row?.hasChildNodes()) return

  const cardWrappers = row.querySelectorAll('.ukhsa-chart-card-section')
  if (cardWrappers.length < 2 || cardWrappers.length > 3) return

  let tallest = 0
  for (const wrapper of cardWrappers) {
    const element = wrapper as HTMLElement
    if (element.style.minHeight) element.style.minHeight = ''
    if (element.clientHeight > tallest) tallest = element.clientHeight
  }

  for (const wrapper of cardWrappers) {
    ;(wrapper as HTMLElement).style.minHeight = `${tallest}px`
  }
}

interface ChartCardSectionRowProps {
  readonly children: ReactNode
}

export function ChartCardSectionRow({ children }: ChartCardSectionRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    equaliseCardHeights(rowRef.current)
  }, [children])

  return <div ref={rowRef}>{children}</div>
}
