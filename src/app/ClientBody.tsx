'use client'
import { ReactNode, useEffect } from 'react'

export function ClientBody({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.classList.add('js-enabled', 'govuk-frontend-supported')
    return () => {
      document.body.classList.remove('js-enabled', 'govuk-frontend-supported')
    }
  }, [])
  return <>{children}</>
}
