'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useTranslation } from '@/app/i18n/client'

interface ChartEmptyProps {
  resetHref: string
  showResetLink?: boolean
}

export function ChartEmpty({ resetHref, showResetLink = true }: ChartEmptyProps) {
  const { t } = useTranslation('common')
  const searchParams = useSearchParams()
  const areaName = searchParams.get('areaName')

  return (
    <div className="govuk-body text-center">
      <p>{t('areaSelector.noData', { areaName, context: areaName && 'withArea' })}</p>
      {showResetLink && (
        <Link className="govuk-link govuk-link--no-visited-state" href={resetHref} scroll={false}>
          {t('areaSelector.resetBtn')}
        </Link>
      )}
    </div>
  )
}
