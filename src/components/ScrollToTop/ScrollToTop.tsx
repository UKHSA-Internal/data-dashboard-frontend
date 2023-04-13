import React, { useState, useEffect } from 'react'
import { ArrowIcon, Button } from './ScrollToTop.styles'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button isVisible={isVisible} onClick={handleClick}>
      <ArrowIcon />
      Back to top
    </Button>
  )
}

export default ScrollToTop
