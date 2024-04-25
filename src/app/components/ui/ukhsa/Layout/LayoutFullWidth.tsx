import { ReactNode } from 'react'

import { BackToTop } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

export const LayoutFullWidth = async ({ children }: { children: ReactNode }) => {
  const { t } = await useTranslation('common')

  return (
    <>
      <div className="govuk-!-padding-top-4 flex flex-col gap-0 xl:flex-row xl:gap-7">
        <main className="govuk-main-wrapper govuk-!-padding-top-0" id="main-content">
          {children}
        </main>
      </div>
      <BackToTop label={t('backToTop')} className="govuk-!-margin-bottom-4" />
    </>
  )
}
