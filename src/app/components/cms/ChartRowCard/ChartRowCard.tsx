'use client'
import { useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'
import { useDebounceValue, useWindowSize } from 'usehooks-ts'

interface ChartRowCardProps {
  children: ReactNode
}

const DESKTOP_BREAKPOINT = 1024
const TABLET_BREAKPOINT = 768
const DEBOUNCE_MILLISECONDS = 20

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
    // reset only if a height is already applied (i.e. don't reset on page load)
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setChartCardTabSize = (row: HTMLDivElement | null, width: number) => {
  // exit early if there's no columns
  if (!row || !row.hasChildNodes()) {
    return
  }

  // get all the chart tab panel elements within the current row
  const allTabPanels = row.querySelectorAll('[role="tabpanel"]')
  const chartTabPanels = row.querySelectorAll('[role="tabpanel"][data-type="chart"]')

  // exit early in 1 column chart rows when the tab panel is zero in height due to tab being inactive
  if (chartTabPanels.length === 1 && chartTabPanels[0]?.clientHeight === 0) {
    return
  }

  // exit early in 2 column chart rows when both tab panels are zero in height due to both tabs being inactive
  if (chartTabPanels.length === 2 && chartTabPanels[0]?.clientHeight === 0 && chartTabPanels[1]?.clientHeight === 0) {
    return
  }

  // calculate largest tab header of the two
  let largestTab = 0

  // otherwise, reset any previously applied heights
  for (const chartTabPanel of chartTabPanels) {
    const panel = chartTabPanel as HTMLElement

    // reset only if a height is already applied (i.e. don't reset on page load)
    if (panel.style.height) {
      panel.style.height = ``
    }

    if (chartTabPanel.clientHeight > largestTab) {
      largestTab = chartTabPanel.clientHeight
    }
  }

  // set height to all tab panels
  for (const tabPanel of allTabPanels) {
    if (width >= TABLET_BREAKPOINT) {
      ;(tabPanel as HTMLElement).style.height = `${largestTab}px`
    } else {
      ;(tabPanel as HTMLElement).style.height = ``
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

export function ChartRowCard({ children }: ChartRowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()
  const searchParams = useSearchParams()
  const [debouncedWidth] = useDebounceValue(width, DEBOUNCE_MILLISECONDS)

  useEffect(() => {
    setChartCardHeaderSize(ref.current, debouncedWidth)
    // TODO: Investigate bug in CDD-1929
    // setChartCardTabSize(ref.current, debouncedWidth)
  }, [ref, debouncedWidth, searchParams])

  return (
    <div ref={ref} className="mb-3 sm:mb-6 lg:flex lg:gap-6" data-testid="chart-row-cards">
      {children}
    </div>
  )
}
