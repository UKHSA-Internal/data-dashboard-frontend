'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'

import { useTranslation } from '@/app/i18n/client'

interface ShowMoreProps {
  className?: string
}

export const ShowMore = ({ className }: ShowMoreProps) => {
  const { t } = useTranslation('common')

  const [showMore, setShowMore] = useState(false)

  return (
    <a
      className={clsx(
        className,
        'govuk-link--no-visited-state govuk-!-padding-1 govuk-!-padding-right-2 bottom-3 inline-flex items-center print:hidden [&:not(:focus)]:bg-white'
      )}
      onClick={(event) => {
        event.preventDefault()
        
      }}
    >
      <div
        className="govuk-!-margin-right-2 size-[16px] bg-back_to_top bg-center bg-no-repeat"
        aria-hidden
        data-testid="up-arrow"
      />
      {t('showMore')}
    </a>
  )
}
