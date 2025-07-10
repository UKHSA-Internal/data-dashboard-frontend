'use client'
import { ReactNode } from 'react'

import { useTranslation } from '@/app/i18n/client'
import { client } from '@/api/utils/api.utils'

interface SelectedFiltersProps {
  children?: ReactNode
}

export function SelectedFilters({ children }: SelectedFiltersProps) {
  const { t } = useTranslation('common')
  return (
    <div className="flex flex-wrap">
      <h2 className="govuk-heading-s govuk-!-margin-bottom-2 w-full">{t('globalFilter.globalFilterTitle')}</h2>
      {children}
    </div>
  )
}
