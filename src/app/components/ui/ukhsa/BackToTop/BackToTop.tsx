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
  const [shouldRender, setShouldRender] = useState(false)

  const isSticky = horizontalWindowPosition > 200

  useEffect(() => {
    const checkPageHeight = () => {
      const contentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      // Only show if content exceeds viewport by at least 50%
      setShouldRender(contentHeight > viewportHeight * 1.5)
    }

    checkPageHeight()

    // Recheck if content dynamically changes (e.g., lazy loading, accordions)
    const observer = new ResizeObserver(checkPageHeight)
    observer.observe(document.body)

    return () => observer.disconnect()
  }, [])

  if (!shouldRender) return null

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
