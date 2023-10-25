'use client'

import { ReactNode, useLayoutEffect, useRef } from 'react'
import { useDebounce, useWindowSize } from 'usehooks-ts'

interface ChartRowCardProps {
  children: ReactNode
}

const DESKTOP_BREAKPOINT = 1024
const DEBOUNCE_MILLISECONDS = 5

const setChartCardHeaderSize = (row: HTMLDivElement | null, width: number) => {
  // exit early if there's not two columns
  if (!row || !row.hasChildNodes() || row.childNodes.length < 2) {
    return
  }

  // get the header element within each card article
  const headers = row.querySelectorAll('article > header')

  if (headers.length !== 2) return

  // calculate largest article header of the two
  let largestHeader = 0

  for (const header of headers) {
    // reset any previously applied style
    ;(header as HTMLElement).style.minHeight = ''

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

const setChartCardTabSize = (row: HTMLDivElement | null) => {
  // exit early if there's no columns
  if (!row || !row.hasChildNodes()) {
    return
  }

  // get all the tab panel elements within the current row
  const tabPanels = row.querySelectorAll('[role="tabpanel"]')

  // exit early if both charts are zero as neither tab is active
  if (tabPanels[0]?.clientHeight === 0 && tabPanels[3]?.clientHeight === 0) return

  // calculate largest tab header of the two
  let largestTab = 0

  // otherwise, reset any previously applied heights
  for (const tabPanel of tabPanels) {
    ;(tabPanel as HTMLElement).style.height = ``

    if (tabPanel.clientHeight > largestTab) {
      largestTab = tabPanel.clientHeight
    }
  }

  // set height to all tab panels
  for (const tabPanel of tabPanels) {
    ;(tabPanel as HTMLElement).style.height = `${largestTab}px`
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

export function ChartRowCard({ children }: ChartRowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  const debouncedWidth = useDebounce(width, DEBOUNCE_MILLISECONDS)

  useLayoutEffect(() => {
    setChartCardHeaderSize(ref.current, debouncedWidth)
    setChartCardTabSize(ref.current)
  }, [ref, debouncedWidth])

  return (
    <div ref={ref} className="mb-3 sm:mb-6 lg:flex lg:gap-6" data-testid="chart-row-cards">
      {children}
    </div>
  )
}
