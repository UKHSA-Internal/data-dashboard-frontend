import React, { useState, useEffect } from 'react'
import { ArrowIcon, Button } from './ScrollToTop.styles'
import { useTranslation } from 'next-i18next'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useTranslation('common')

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300)
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button href="#content" $isVisible={isVisible} onClick={handleClick}>
      <ArrowIcon />
      {t('backToTop')}
    </Button>
  )
}
