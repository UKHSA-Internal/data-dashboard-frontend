import { useTranslation } from 'next-i18next'
import React from 'react'

import { ArrowIcon, Button } from './ScrollToTop.styles'

export const ScrollToTop = () => {
  const { t } = useTranslation('common')

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button href="#content" onClick={handleClick}>
      <ArrowIcon />
      {t('backToTop')}
    </Button>
  )
}
