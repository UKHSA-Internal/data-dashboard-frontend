'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  return (
    <div>
      <div className="govuk-!-padding-3 fixed left-0 top-0 z-50">
        <Link href="/" onClick={() => router.back()} className="govuk-button govuk-button--secondary inline-flex gap-2">
          <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20">
            <path d="M4.828,11L12.314,18.485L10.899,19.899L1,10L10.899,0.101L12.314,1.515L4.828,9L19,9L19,11L4.828,11Z"></path>
          </svg>
          Exit map
        </Link>
      </div>
      <div className="fixed inset-0 z-40 bg-white">{children}</div>
    </div>
  )
}
