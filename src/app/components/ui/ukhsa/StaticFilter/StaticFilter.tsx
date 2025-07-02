'use client'

import clsx from 'clsx'
import React, { ReactNode, useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'

import { useTranslation } from '@/app/i18n/client'

interface StaticFilterProps {
  href?: string
  className?: string
  children?: ReactNode
}

export function StaticFilter({ href = '#filter', className, children }: StaticFilterProps) {
  const { y: horizontalWindowPosition } = useWindowScroll()
  const { t } = useTranslation('common')

  const [isSticky, setIsSticky] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (horizontalWindowPosition > 200) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }, [horizontalWindowPosition])

  return (
    <>
      <div
        className={clsx('bg-grey-3', {
          'govuk-!-padding-3': isVisible,
          'h-0 m-0 overflow-hidden govuk-!-padding-0': !isVisible,
        })}
      >
        {children}
      </div>
      <a
        href={href}
        className={clsx(
          className,
          'govuk-link--no-visited-state govuk-!-padding-1 govuk-!-padding-right-2 govuk-!-padding-left-2 sticky bottom-3 float-right inline-flex items-center bg-black text-white no-underline shadow-none ukhsa-focus focus:bg-yellow focus:text-black',
          {
            // 'hidden': !isSticky,
            sticky: isSticky,
          }
        )}
        onClick={() => {
          setIsVisible((prevState) => !prevState)
        }}
      >
        {isVisible ? t('globalFilter.hideFilters') : t('globalFilter.showFilters')}
      </a>
    </>
  )
}

export default StaticFilter
