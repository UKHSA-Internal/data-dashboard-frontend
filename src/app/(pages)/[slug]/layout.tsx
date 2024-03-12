import { ReactNode } from 'react'

import { BackToTop } from '@/app/components/ui/ukhsa/BackToTop/BackToTop'
import { useTranslation } from '@/app/i18n'

export default async function Layout({ children }: { children: ReactNode }) {
  const { t } = await useTranslation('common')

  return (
    <>
      {children}
      <BackToTop label={t('backToTop')} />
    </>
  )
}
