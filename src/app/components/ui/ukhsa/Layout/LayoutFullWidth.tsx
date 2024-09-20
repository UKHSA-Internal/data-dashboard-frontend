import { ReactNode } from 'react'

import { BackToTop } from '@/app/components/ui/ukhsa'

export const LayoutFullWidth = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="govuk-!-padding-top-4 flex flex-col gap-0 xl:gap-7">
        <main className="govuk-main-wrapper govuk-!-padding-top-0" id="main-content">
          {children}
        </main>
      </div>
      <BackToTop className="govuk-!-margin-bottom-4" />
    </>
  )
}
