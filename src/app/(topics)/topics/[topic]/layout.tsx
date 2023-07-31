import { ReactNode } from 'react'

import { BackToTop } from '@/app/components/ui/ukhsa'
import { useTranslation } from '@/app/i18n'

export default async function TopicsLayout({ children }: { children: ReactNode }) {
  const { t } = await useTranslation('common')

  return (
    <>
      {children}
      <BackToTop label={t('backToTop')} />
    </>
  )
}
