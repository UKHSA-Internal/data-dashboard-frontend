'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const useNavigationEvent = (onPathnameChange: (pathname: string) => void) => {
  const pathname = usePathname() // Get current route
  const searchParams = useSearchParams()

  const url = `${pathname}${!!searchParams?.toString() ? `?${searchParams?.toString()}` : ''}`

  // Save url on component mount into a REF
  const savedUrlRef = useRef(url)

  useEffect(() => {
    // If REF has been changed, do the stuff
    if (savedUrlRef.current !== url) {
      onPathnameChange(url)
      // Update REF
      savedUrlRef.current = url
    }
  }, [url, onPathnameChange])
}
