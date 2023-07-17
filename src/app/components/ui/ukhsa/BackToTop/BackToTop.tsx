'use client'

import React from 'react'

import { useTranslation } from '@/app/i18n'

export const BackToTop = async () => {
  const { t } = await useTranslation('common')

  return (
    <a
      href="#content"
      className="inline-flex items-center"
      onClick={(event) => {
        event.preventDefault()
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
    >
      <div
        className="govuk-!-margin-right-2 h-[16px] w-[16px] bg-back_to_top bg-center bg-no-repeat"
        aria-hidden
        data-testid="up-arrow"
      />
      {t('backToTop')}
    </a>
  )
}
