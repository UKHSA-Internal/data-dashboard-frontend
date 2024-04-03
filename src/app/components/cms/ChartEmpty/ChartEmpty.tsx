'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useTranslation } from '@/app/i18n/client'

interface ChartEmptyProps {
  resetHref: string
}

export function ChartEmpty({ resetHref }: ChartEmptyProps) {
  const { t } = useTranslation('common')
  const searchParams = useSearchParams()
  const areaName = searchParams.get('areaName')

  return (
    <div className="govuk-body text-center">
      <p>{t('areaSelector.noData', { areaName, context: areaName && 'withArea' })}</p>
      <Link className="govuk-link govuk-link--no-visited-state" href={resetHref} scroll={false}>
        {t('areaSelector.resetBtn')}
      </Link>
    </div>
  )
}
