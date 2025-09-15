'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'

import { useTranslation } from '@/app/i18n/client'

interface BackToTopProps {
  href?: string
  className?: string
}

export const BackToTop = ({ href = '#main-content', className }: BackToTopProps) => {
  const { y: horizontalWindowPosition } = useWindowScroll()
  const { t } = useTranslation('common')

  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    if (horizontalWindowPosition > 200) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }, [horizontalWindowPosition])

  return (
    <a
      href={href}
      className={clsx(
        className,
        'govuk-link--no-visited-state govuk-!-padding-1 govuk-!-padding-right-2 bottom-3 inline-flex items-center print:hidden [&:not(:focus)]:bg-white',
        {
          'xl:sticky': isSticky,
        }
      )}
      onClick={(event) => {
        event.preventDefault()
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
    >
      <div
        className="govuk-!-margin-right-2 size-[16px] bg-back_to_top bg-center bg-no-repeat"
        aria-hidden
        data-testid="up-arrow"
      />
      {t('backToTop')}
    </a>
  )
}
