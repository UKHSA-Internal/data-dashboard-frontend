import React, { ReactNode } from 'react'

import { BackToTop } from '@/app/components/ui/ukhsa'
import LayoutBlackBanner from '@/app/components/ui/ukhsa/Layout/LayoutBlackBanner'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutBlackBanner>
      <div className="govuk-!-padding-top-4 flex flex-col gap-0 xl:gap-7">
        <main className="govuk-main-wrapper govuk-!-padding-top-0" id="main-content">
          {children}
        </main>
      </div>
      <BackToTop className="govuk-!-margin-bottom-4" />
    </LayoutBlackBanner>
  )
}
