'use client'

import clsx from 'clsx'
import React, { ReactNode, useState } from 'react'

import { useTranslation } from '@/app/i18n/client'

interface StaticFilterProps {
  href?: string
  className?: string
  children?: ReactNode
}

export default function StaticFilter({ href = '#filter', className, children }: StaticFilterProps) {
  const { t } = useTranslation('common')

  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="govuk-!-margin-bottom-8 sticky top-0 z-10">
      <div
        className={clsx({
          'h-0 m-0 overflow-hidden govuk-!-padding-0': !isVisible,
        })}
      >
        {children}
      </div>
      <a
        href={href}
        className={clsx(
          className,
          'govuk-link--no-visited-state govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 sticky bottom-3 float-right inline-flex items-center bg-black text-white no-underline shadow-none ukhsa-focus focus:bg-yellow focus:text-black'
        )}
        onClick={() => {
          setIsVisible((prevState) => !prevState)
        }}
      >
        {isVisible ? t('globalFilter.hideFilters') : t('globalFilter.showFilters')}
      </a>
    </div>
  )
}
