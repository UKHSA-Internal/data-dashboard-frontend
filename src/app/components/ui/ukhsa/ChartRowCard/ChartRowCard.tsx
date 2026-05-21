'use client'
import { useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'
import { useDebounceValue, useWindowSize } from 'usehooks-ts'

interface ChartRowCardProps {
  children: ReactNode
  testId?: string
}

const DESKTOP_BREAKPOINT = 1024
const DEBOUNCE_MILLISECONDS = 20

const setChartCardHeaderSize = (row: HTMLDivElement | null, width: number) => {
  // exit early if there's not two columns
  if (!row || !row.hasChildNodes() || row.childNodes.length < 2) {
    return
  }

  const headers = row.querySelectorAll('article > header')

  if (headers.length !== 2) return

  let largestHeader = 0

  for (const header of headers) {
    // Don't reset on page load)
    const headerEl = header as HTMLElement

    if (headerEl.style.minHeight) {
      headerEl.style.minHeight = ``
    }

    if (header.clientHeight > largestHeader) {
      largestHeader = header.clientHeight
    }
  }

  // set largest height to each card article header
  for (const header of headers) {
    if (width >= DESKTOP_BREAKPOINT) {
      ;(header as HTMLElement).style.minHeight = `${largestHeader}px`
    }
  }
}

/**
 *
 * The ChartRowCard component serves as a wrapper component for each row rendered within a cms page section
 *
 * Each column within the row is progressively enhanced with two layout effects
 *    - Two column rows
 *      Adjust the card header height to be the larger of the two to ensure the tabs are verticalled aligned
 *
 *    - One and two column rows
 *      Calculate and set the height of the tab panels based on the dynamic height of the chart svg
 *
 */
export function ChartRowCard({ children, testId = 'chart-row-cards' }: ChartRowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const searchParams = useSearchParams()
  const [debouncedWidth] = useDebounceValue(width, DEBOUNCE_MILLISECONDS)

  useEffect(() => {
    setChartCardHeaderSize(ref.current, debouncedWidth)
    // TODO: Investigate bug in CDD-1929
  }, [ref, debouncedWidth, searchParams])

  return (
    <div ref={ref} className="mb-3 sm:mb-6 lg:flex lg:gap-6" data-testid={testId}>
      {children}
    </div>
  )
}
