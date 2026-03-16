'use client'
import { ReactNode, useEffect } from 'react'

type ClientBodyProps = { readonly children: ReactNode }
export function ClientBody({ children }: ClientBodyProps) {
  useEffect(() => {
    document.body.classList.add('js-enabled', 'govuk-frontend-supported')
    return () => {
      document.body.classList.remove('js-enabled', 'govuk-frontend-supported')
    }
  }, [])
  return <>{children}</>
}
