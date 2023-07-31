import { ReactNode } from 'react'

import { BackToTop } from '../../components/ui/ukhsa/BackToTop/BackToTop'
import { useTranslation } from '../../i18n'

export default async function Layout({ children }: { children: ReactNode }) {
  const { t } = await useTranslation('common')

  return (
    <>
      {children}
      <BackToTop label={t('backToTop')} />
    </>
  )
}
